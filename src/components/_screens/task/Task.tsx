import { config as apiConfig, DetailedError } from "api";
import { JobsApi, LocationsApi, ResponseError, TasksApi } from "api_client";
import Title from "components/Title";
import { usePopupState } from "material-ui-popup-state/hooks";
import { useReducer, useState } from "react";
import { Params, useLoaderData } from "react-router-dom";
import { CompanyHierarchyNode, Job, Object, Step, TaskType, GetStepActionString } from "types";
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

import TaskComponentFields from "./TaskComponentFields";
import reducer, {
    State,
    Action,
    EditedObject,
    EditedStep,
    EditedTask,
    SelectionType,
} from "./taskEditorReducer";

const resolveStepObjects = (
    steps: Array<Step & { objectId: number }>,
    objects: Array<Object>
): Array<Step> => {
    const resolvedSteps = steps.map((s) => {
        s.object = objects.find((o) => o.id === s.objectId)!;
        return s;
    });

    return resolvedSteps;
};

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

// get task and children steps, objects
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
        const resolvedSteps = resolveStepObjects(steps, objects);

        const [stepsWithIds, objectsWithIds] = assignTemporaryIds(steps, objects);

        const editedTask: EditedTask = {
            id: task.id!,
            name: task.name!,
            taskType: task.taskType!,
            location: task.location! as CompanyHierarchyNode,
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

// task update
export async function action({ request }: { request: Request }) {}

// NOTE(rg): the add buttons on the object and step lists don't have tooltips on purpose. When they
// have tooltips, hovering over the buttons and then moving the mouse away increases the height of
// the snapshot image by a bit (?????)
export default function Task() {
    const theme = useTheme();
    const { jobs, task: originalTask, snapshot } = useLoaderData() as LoaderData;

    const [state, dispatch] = useReducer(reducer, {
        selection: null,
        task: structuredClone(originalTask),
    });

    const snapshotUrl = URL.createObjectURL(snapshot);

    const isBelowLg = useMediaQuery(theme.breakpoints.down("lg"));

    const jobsSelectArray = [
        <MenuItem key={""} value={""}>
            <i>None</i>
        </MenuItem>,
        ...jobs.map((j: Job) => (
            <MenuItem key={j.id} value={j.id}>
                {j.name}
            </MenuItem>
        )),
    ];

    type Groups = { [orderNum: number]: Array<Step> };
    const stepsGroupedByOrder = state.task.steps.reduce<Groups>((groups: Groups, step: Step) => {
        groups[step.orderNum] = groups[step.orderNum] || [];
        groups[step.orderNum]!.push(step);
        return groups;
    }, {});

    const select = (uuid: string, type: SelectionType) => {
        dispatch({ type: "Select", selection: { uuid, selectionType: type } });
    };

    const sortedObjects = [...state.task.objects];
    sortedObjects.sort((o1, o2) => {
        if (o1.name > o2.name) return 1;
        else if (o1.name < o2.name) return -1;
        else return 0;
    });

    return (
        <Container maxWidth="xl" sx={{ height: !isBelowLg ? "calc(100% - 32px)" : "auto", my: 2 }}>
            <Paper elevation={8} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Grid container sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} lg={4} display="flex" flexDirection="column">
                        <Box display="flex" flexDirection="column" p={2}>
                            <Title sx={{ mb: 2 }}>General</Title>
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        required
                                        label="Name"
                                        name="name"
                                        fullWidth
                                        defaultValue={state.task.name}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        required
                                        select
                                        label="Task type"
                                        name="taskType"
                                        fullWidth
                                        defaultValue={state.task.taskType}
                                    >
                                        <MenuItem value={""}>
                                            <i>None</i>
                                        </MenuItem>
                                        <MenuItem value={TaskType.ToolKit}>Tool kit</MenuItem>
                                        <MenuItem value={TaskType.ItemKit}>Item kit</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        required
                                        disabled
                                        label="Location"
                                        defaultValue={state.task.location.name}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        required
                                        select
                                        label="Job"
                                        name="parentJobId"
                                        fullWidth
                                        defaultValue={state.task.job.id}
                                    >
                                        {jobsSelectArray}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider flexItem />
                        <Box display="flex" flexDirection="column" flexGrow={1}>
                            <Grid container height="100%">
                                <Grid item xs={5} display="flex" flexDirection="column" p={2}>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ mb: 2 }}
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
                                            <AddCircleIcon fontSize="large" />
                                        </IconButton>
                                    </Box>
                                    <List disablePadding>
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
                                </Grid>
                                <Grid item xs={7} display="flex">
                                    {!isBelowLg ? (
                                        <Divider orientation="vertical" flexItem />
                                    ) : null}
                                    <Box display="flex" flexDirection="column" flexGrow={1} p={2}>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ mb: 2 }}
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
                                                <AddCircleIcon fontSize="large" />
                                            </IconButton>
                                        </Box>
                                        <List disablePadding>
                                            {state.task.steps.map((s, i) => {
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
                                                                state.selection.selectionType ===
                                                                    "step"
                                                            }
                                                            onClick={() => select(s.uuid, "step")}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "1.2em",
                                                                    color: color,
                                                                }}
                                                            >
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
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={8} display="flex">
                        {!isBelowLg ? <Divider orientation="vertical" flexItem /> : null}
                        <Box display="flex" flexDirection="column" flexGrow={1} sx={{ p: 2 }}>
                            <Title sx={{ mb: 2 }}>Location snapshot</Title>
                            <Box flexShrink={0}>
                                <Box
                                    component="img"
                                    src={snapshotUrl}
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                        bgcolor: "black",
                                        boxShadow: 3,
                                    }}
                                />
                            </Box>
                            <Box display="flex" flexDirection="column" flexGrow={1}>
                                <TaskComponentFields
                                    key={state?.selection?.uuid ?? null}
                                    state={state}
                                    dispatch={dispatch}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Divider flexItem />
                <Box display="flex" p={1} justifyContent="space-between">
                    <Box></Box>
                    <Box display="flex" gap={1}>
                        <Button variant="contained" color="info">
                            Revert
                        </Button>
                        <Button variant="contained">Save changes</Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
