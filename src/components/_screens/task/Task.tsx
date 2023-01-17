import { config as apiConfig, DetailedError } from "api";
import { JobsApi, LocationsApi, ResponseError, TasksApi, TasksUpdateReq } from "api_client";
import Title from "components/Title";
import { usePopupState } from "material-ui-popup-state/hooks";
import { useSnackbar } from "notistack";
import React, { useEffect, useMemo } from "react";
import { useReducer, useState } from "react";
import {
    ActionFunctionArgs,
    Params,
    useFetcher,
    useLoaderData,
    useLocation,
    useNavigate,
} from "react-router-dom";
import {
    CompanyHierarchyNode,
    Job,
    Object,
    Step,
    TaskType,
    GetStepActionString,
    Location,
} from "types";
import { bifilter } from "utils/bifilter";
import { v4 as uuidv4 } from "uuid";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    MenuItem,
    Paper,
    TextField,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import ObjectForm from "./ObjectForm";
import SnapshotCanvas from "./SnapshotCanvas";
import StepForm from "./StepForm";
import reducer, {
    State,
    Action,
    EditedObject,
    EditedStep,
    EditedTask,
    SelectionType,
} from "./reducer";

// Get the difference between the original object and the edited object. Called before sending the
// update to determine what the update request should contain.
//  - all fields inside the request are optional. This lets us only update things that've changed
//  - NOTE(rg): we get rid of all unneeded fields before returning [...]
const getTaskDelta = (originalTask: EditedTask, newTask: EditedTask) => {
    const delta: TasksUpdateReq = {};

    delta.parentJobId = originalTask.job.id;

    if (originalTask.name !== newTask.name) {
        delta.newName = newTask.name;
    }

    if (originalTask.taskType !== newTask.taskType) {
        delta.newType = newTask.taskType;
    }

    let [newObjects, modifiedObjects] = bifilter((o) => o.id === 0, newTask.objects);
    let [newSteps, modifiedSteps] = bifilter((s) => s.id === 0, newTask.steps);

    const newStepsReq = newSteps.map((s) => ({
        ...s,
        objectName: newTask.objects.find((o) => o.uuid === s.object.uuid)!.name,
    })); //

    // console.log(originalTask.objects);
    // console.log(modifiedObjects);

    modifiedObjects = modifiedObjects.filter((o) => {
        const orig = originalTask.objects.find((_o) => _o.uuid === o.uuid)!;
        return (
            orig.name !== o.name ||
            orig.coordinates.x !== o.coordinates.x ||
            orig.coordinates.y !== o.coordinates.y ||
            orig.coordinates.width !== o.coordinates.width ||
            orig.coordinates.height !== o.coordinates.height
        );
    });

    const modifiedStepsReq = modifiedSteps
        .filter((s) => {
            const orig = originalTask.steps.find((_s) => _s.uuid === s.uuid)!;
            return (
                orig.object.uuid !== s.object.uuid ||
                orig.orderNum !== s.orderNum ||
                orig.expectedInitialState !== s.expectedInitialState ||
                orig.expectedSubsequentState !== s.expectedSubsequentState
            );
        })
        .map((s) => ({
            ...s,
            objectName: newTask.objects.find((o) => o.uuid == s.object.uuid)!.name,
        })); //

    const deletedObjects = originalTask.objects
        .map((o) => o.id)
        .filter((id) => !newTask.objects.map((o) => o.id).includes(id));

    const deletedSteps = originalTask.steps
        .map((s) => s.id)
        .filter((id) => !newTask.steps.map((s) => s.id).includes(id));

    if (newObjects.length) {
        delta.newObjects = newObjects.map((o: any) => {
            // delete o["id"];
            // delete o["uuid"];
            return o;
        });
    }

    if (newStepsReq.length) {
        delta.newSteps = newStepsReq;
    }

    if (modifiedObjects.length) {
        delta.modifiedObjects = modifiedObjects;
    }

    if (modifiedStepsReq.length) {
        delta.modifiedSteps = modifiedStepsReq;
    }

    if (deletedObjects.length) {
        delta.deletedObjects = deletedObjects;
    }

    if (deletedSteps.length) {
        delta.deletedSteps = deletedSteps;
    }

    return delta;
};

// The steps we get from the backend only have an `objectId` field, but we want them to contain the
// objects themselves.
const resolveStepObjects = (steps: Array<Step & { objectId: number }>, objects: Array<Object>) => {
    steps.map((s) => {
        s.object = objects.find((o) => o.id === s.objectId)!;
        return s;
    });
};

// We assign temporary UUIDs to all objects and steps because we want them to have a stable
// identity for the duration of the editing. We can't use "regular" numeric IDs because only the
// entities returned by the backend have IDs, entities created on the frontend don't. Names are
// editable, therefore not stable, so we can't use those (also, steps don't have names).
//
// The UUIDs are discarded once the editing is finished, the backend doesn't need to know about
// them.
const assignTemporaryIds = (
    _steps: Array<Step>,
    _objects: Array<Object>
): [Array<EditedStep>, Array<EditedObject>] => {
    const objects = _objects.map((o) => ({ ...o, uuid: uuidv4() }));
    const steps = _steps.map((s) => ({
        ...s,
        uuid: uuidv4(),
        object: objects.find((o) => o.name === s.object.name)!,
    }));

    return [steps, objects];
};

export async function loader({ params }: { params: Params }) {
    const id = params["task_id"]! as any as number;

    try {
        const jobs = (await new JobsApi(apiConfig).apiEndpointsJobsList()) as Array<Job>;
        const task = await new TasksApi(apiConfig).apiEndpointsTasksGetById({ id });
        const stepsObjects = await new TasksApi(apiConfig).apiEndpointsTasksGetObjectsAndSteps({
            taskId: id,
        });
        const snapshot = await new LocationsApi(apiConfig).apiEndpointsLocationsGetSnapshot({
            id: task!.location!.id!,
        });

        const steps = stepsObjects.steps! as Array<Step & { objectId: number }>;
        const objects = stepsObjects.objects! as Array<EditedObject>;
        resolveStepObjects(steps, objects);

        const [stepsWithIds, objectsWithIds] = assignTemporaryIds(steps, objects);

        const reqLocation = (await new LocationsApi(apiConfig).apiEndpointsLocationsGetById({
            id: task!.location!.id!,
        })) as Location;

        const editedTask: EditedTask = {
            id: task.id!,
            name: task.name!,
            taskType: task.taskType!,
            location: reqLocation,
            job: task.job! as Job,
            steps: stepsWithIds,
            objects: objectsWithIds,
        };

        return { jobs, task: editedTask, snapshot };
    } catch (err) {
        if (err instanceof ResponseError) {
            throw new DetailedError(
                err,
                <Typography fontSize="1em">Task or snapshot not found.</Typography>
            );
        }

        throw err;
    }
}

type LoaderData = {
    jobs: Array<Job>;
    task: EditedTask;
    snapshot: Blob;
};

// The Tasks.Update endpoint on the backend expects the delta between the "initial" task (which we
// load when navigating to this page), and the edited task. Its structure looks roughly like this:
//  - task properties (name, type, parent job, etc.)
//  - new steps
//  - modified steps
//  - deleted steps' ids
//  - new objects
//  - modified objects
//  - deleted objects' ids
export async function action({ params, request }: ActionFunctionArgs) {
    const id = params["task_id"]! as any as number;
    const formData = await request.formData();

    const delta = JSON.parse(formData.get("delta")!.toString());

    try {
        await new TasksApi(apiConfig).apiEndpointsTasksUpdate({ id, tasksUpdateReq: delta });
    } catch (_err) {
        // noop
    }
}

// This component was extracted to reduce the extreme JSX nesting in Task
function GroupedStepsList({
    state,
    select,
}: {
    state: State;
    select: (uuid: string, type: SelectionType) => void;
}) {
    type Groups = { [orderNum: number]: Array<EditedStep> };

    const stepsGroupedByOrder = state.task.steps.reduce<Groups>(
        (groups: Groups, step: EditedStep) => {
            groups[step.orderNum] = groups[step.orderNum] || [];
            groups[step.orderNum]!.push(step);
            return groups;
        },
        {}
    );

    return (
        <Box sx={{ height: "100%", overflowY: "auto", flex: 1 }}>
            {window.Object.entries(stepsGroupedByOrder).map(([order, steps], i) => {
                steps.sort((s1, s2) => {
                    const n1 = s1.object.name.toLowerCase();
                    const n2 = s2.object.name.toLowerCase();
                    if (n1 > n2) return 1;
                    else if (n1 < n2) return -1;
                    else return 0;
                });
                return (
                    <React.Fragment key={i}>
                        <Divider
                            textAlign="left"
                            sx={{
                                px: 1,
                                fontFamily: "monospace",
                                color: "text.secondary",
                                "&::before": {
                                    borderColor: "background.subtle",
                                },
                                "&::after": {
                                    borderColor: "background.subtle",
                                },
                            }}
                        >
                            Order {order}
                        </Divider>
                        <List disablePadding>
                            {steps.map((s, i) => {
                                const actionString = GetStepActionString(
                                    s.expectedInitialState,
                                    s.expectedSubsequentState
                                );
                                const color =
                                    actionString === "remove"
                                        ? "error.main"
                                        : actionString === "replace"
                                        ? "info.main"
                                        : "text.default";

                                return (
                                    <ListItem key={i} disablePadding>
                                        <ListItemButton
                                            selected={
                                                !!state.selection &&
                                                s.uuid === state.selection.uuid &&
                                                state.selection.selectionType === "step"
                                            }
                                            onClick={() => select(s.uuid, "step")}
                                        >
                                            <Typography sx={{ fontSize: "1.2em", color: color }}>
                                                {actionString}{" "}
                                                <Box
                                                    component="span"
                                                    sx={{ color: "primary.main" }}
                                                >
                                                    {s.object.name}
                                                </Box>
                                            </Typography>
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </React.Fragment>
                );
            })}
        </Box>
    );
}

export default function Task() {
    const theme = useTheme();
    const fetcher = useFetcher();
    const location = useLocation();
    const { jobs, task: originalTask, snapshot } = useLoaderData() as LoaderData;
    const isLg = useMediaQuery(theme.breakpoints.up("lg"));
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(reducer, {
        selection: null,
        task: structuredClone(originalTask),
    });

    const isBelowLg = useMediaQuery(theme.breakpoints.down("lg"));

    const select = (uuid: string, type: SelectionType) => {
        dispatch({ type: "Select", selection: { uuid, selectionType: type } });
    };

    const sortedObjects = [...state.task.objects];
    sortedObjects.sort((o1, o2) => {
        const n1 = o1.name.toLowerCase();
        const n2 = o2.name.toLowerCase();
        if (n1 > n2) return 1;
        else if (n1 < n2) return -1;
        else return 0;
    });

    // NOTE(rg): after a submit, the loader will run to fetch the updated originalTask, so we need
    // to update our state
    useEffect(() => {
        dispatch({ type: "Initialize", task: originalTask });
    }, [originalTask]);

    const onRevert = () => {
        // TODO(rg): pop up a confirm window to avoid the changes being thrown away when the user
        // accidentally clicks Revert instead of Save
        dispatch({ type: "Initialize", task: originalTask });
    };

    const onSave = () => {
        const delta = getTaskDelta(originalTask, state.task);

        // NOTE(rg): this is kinda ugly. We convert the object to JSON and then the action converts
        // it back to an object. We can't pass the object directly because we can only put strings
        // in the FormData.
        fetcher.submit(
            { delta: JSON.stringify(delta) },
            { method: "post", action: location.pathname }
        );

        const taskLocation: Location = state.task.location as Location;
        navigate({ pathname: `/dashboard/${taskLocation.stationId}/location/${taskLocation.id}` });
    };

    const selectedObject = state.task.objects.find((o) => state.selection?.uuid === o.uuid);

    const objectsList = useMemo(
        () => (
            <Grid item xs={5} display="flex" flexDirection="column">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ p: 2 }}
                >
                    <Title>Objects</Title>
                    <IconButton
                        sx={{ color: "primary.main" }}
                        onClick={() =>
                            dispatch({
                                type: "Select",
                                selection: {
                                    uuid: null,
                                    selectionType: "object",
                                },
                            })
                        }
                    >
                        <Tooltip title="Add object">
                            <AddCircleIcon />
                        </Tooltip>
                    </IconButton>
                </Box>
                <Box sx={{ display: "flex", flexGrow: 1 }}>
                    <List sx={{ height: "100%", overflowY: "auto", flex: 1 }} disablePadding>
                        {sortedObjects.map((o, i) => (
                            <ListItem key={i} disablePadding>
                                <ListItemButton
                                    sx={{ fontSize: "1.2em" }}
                                    selected={
                                        !!state.selection &&
                                        o.uuid === state.selection.uuid &&
                                        state.selection.selectionType === "object"
                                    }
                                    onClick={() => select(o.uuid, "object")}
                                >
                                    {o.name}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Grid>
        ),
        [state.task.objects.map((o) => o.name)]
    );

    const groupedStepsList = useMemo(
        () => <GroupedStepsList state={state} select={select} />,
        [state]
    );

    return (
        <Container maxWidth="xl" sx={{ height: !isBelowLg ? "calc(100% - 32px)" : "auto", my: 2 }}>
            <Paper elevation={8} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Grid container sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} lg={4} display="flex" flexDirection="column">
                        <Box display="flex" flexDirection="column" p={2}>
                            <Title sx={{ mb: 2 }}>General</Title>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        label="Name"
                                        name="name"
                                        fullWidth
                                        value={state.task.name}
                                        onChange={(e) =>
                                            dispatch({ type: "RenameTask", name: e.target.value })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        select
                                        label="Task type"
                                        name="taskType"
                                        fullWidth
                                        value={state.task.taskType}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "EditTaskType",
                                                taskType: e.target.value as TaskType,
                                            })
                                        }
                                    >
                                        <MenuItem value={TaskType.ToolKit}>Tool kit</MenuItem>
                                        <MenuItem value={TaskType.ItemKit}>Item kit</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        disabled
                                        label="Location"
                                        defaultValue={state.task.location.name}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        label="Job"
                                        name="parentJobId"
                                        fullWidth
                                        disabled
                                        defaultValue={state.task.job.id}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider flexItem />
                        <Box
                            display="flex"
                            flexDirection="column"
                            flexGrow={1}
                            height={isLg ? "auto" : "400px"}
                        >
                            <Grid container height="100%">
                                <>
                                    {objectsList}
                                    <Grid item xs={7} display="flex">
                                        {!isBelowLg ? (
                                            <Divider orientation="vertical" flexItem />
                                        ) : null}
                                        <Box display="flex" flexDirection="column" flexGrow={1}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ p: 2 }}
                                            >
                                                <Title>Steps</Title>
                                                <IconButton
                                                    sx={{ color: "primary.main" }}
                                                    onClick={() =>
                                                        dispatch({
                                                            type: "Select",
                                                            selection: {
                                                                uuid: null,
                                                                selectionType: "step",
                                                            },
                                                        })
                                                    }
                                                >
                                                    <Tooltip title="Add step">
                                                        <AddCircleIcon />
                                                    </Tooltip>
                                                </IconButton>
                                            </Box>
                                            <Box sx={{ display: "flex", flexGrow: 1, height: 0 }}>
                                                {groupedStepsList}
                                            </Box>
                                        </Box>
                                    </Grid>
                                </>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={8} display="flex">
                        {!isBelowLg ? <Divider orientation="vertical" flexItem /> : null}
                        <Box
                            display="flex"
                            flexDirection="column"
                            flexGrow={1}
                            sx={{ p: 2, width: "100%" }}
                        >
                            <Title sx={{ mb: 2 }}>Location snapshot</Title>
                            <Box flexGrow={1} flexShrink={1} width="100%">
                                <SnapshotCanvas
                                    snapshot={snapshot}
                                    state={state}
                                    dispatch={dispatch}
                                />
                            </Box>
                            <Box display="flex" flexDirection="column" flexGrow={0}>
                                {state.selection ? (
                                    state.selection.selectionType === "object" ? (
                                        <ObjectForm
                                            key={
                                                /* TODO(rg): fix this; this has terrible
                                                 * performance, but something like this is needed if we want the
                                                 * object form to rerender when changes are made to
                                                 * the current object on the snapshot canvas */
                                                JSON.stringify(selectedObject)
                                            }
                                            state={state as any}
                                            dispatch={dispatch}
                                        />
                                    ) : (
                                        <StepForm
                                            key={state.selection.uuid}
                                            state={state as any}
                                            dispatch={dispatch}
                                        />
                                    )
                                ) : null}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Divider flexItem />
                <Box display="flex" p={1} justifyContent="space-between">
                    <Box></Box>
                    <Box display="flex" gap={1}>
                        <Button variant="contained" color="info" onClick={onRevert}>
                            Revert
                        </Button>
                        <Button variant="contained" onClick={onSave}>
                            Save changes
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
