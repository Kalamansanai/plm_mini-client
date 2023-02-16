import { backend } from "api";
import { DetectorsApi, LocationsGetTasksResTaskRes } from "api_client";
import { ApiEndpointsDetectorsCommandRequest } from "api_client/apis/DetectorsApi";
import { DetectorsCommandReq } from "api_client/models/index";
import { LabeledValue } from "components/LabeledValue";
import Title from "components/Title";
import ConfirmPopup from "components/popups/ConfirmPopup";
import NoTaskPopup from "components/popups/NoTaskPopup";
import QrPopup from "components/popups/QrPopup";
import TaskDeletePopup from "components/popups/TaskDeletePopup";
import { TIMEOUT } from "dns";
import { bindPopover, PopupState } from "material-ui-popup-state/core";
import { usePopupState } from "material-ui-popup-state/hooks";
import { useEffect, useState } from "react";
import {
    Params,
    useFetcher,
    useLocation,
    useMatch,
    useMatches,
    useNavigate,
    useParams,
} from "react-router-dom";
import {
    Detector,
    DetectorState,
    OngoingTask,
    OngoingTaskInstance,
    TaskInstanceState,
} from "types";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HandymanIcon from "@mui/icons-material/Handyman";
import ListIcon from "@mui/icons-material/List";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Divider,
    Fab,
    IconButton,
    Link,
    List,
    ListItem,
    Paper,
    Popover,
    Tooltip,
    Typography,
} from "@mui/material";

type StartDetectionPopupProps = {
    popupProps: PopupState;
};

function StartDetectionPopup({ popupProps }: StartDetectionPopupProps) {
    const fetcher = useFetcher();

    useEffect(() => {}, [fetcher]);

    return (
        <Popover {...bindPopover(popupProps)}>
            <Box>{fetcher.data || "loading..."}</Box>
        </Popover>
    );
}

type TasksPopupProps = {
    popupProps: PopupState;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
    selected: number;
};

function TasksPopup({ popupProps, setSelected, selected }: TasksPopupProps) {
    const fetcher = useFetcher();
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const [temp, setTemp] = useState();

    const deletePopup = usePopupState({ variant: "popover", popupId: "delete-task" });

    const matchedLocationId = params ? Number(params["location_id"]) : null;

    useEffect(() => {
        if (popupProps.isOpen && fetcher.state === "idle" && !fetcher.data) {
            fetcher.load(location.pathname + "/tasks");
        }

        // Forcefully discard previously loaded data, because otherwise we want to fetch each time
        // the popup is opened
        return () => (fetcher.data = undefined);
    }, [fetcher, location, popupProps]);

    const tasks = (fetcher.data && fetcher.data.tasks) as
        | Array<LocationsGetTasksResTaskRes>
        | undefined;

    if (fetcher.state === "loading") {
        return null;
    }

    async function handleDelete(id: number | undefined) {
        await fetch(`${backend}/api/v1/tasks/${id}`, { method: "DELETE" });
        // fetcher.data = undefined;
        fetcher.load(location.pathname + "/tasks");
    }

    return (
        <>
            <Popover
                {...bindPopover(popupProps)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                PaperProps={{
                    sx: {
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: "600px",
                        alignItems: "center",
                    },
                }}
            >
                {tasks && tasks.length ? (
                    <List>
                        {tasks.map((t, i) => (
                            <ListItem key={i} sx={{ display: "flex", alignItems: "center" }}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    flexGrow={1}
                                    sx={{ mr: 3 }}
                                >
                                    <Typography fontSize="1.4em">{t.name}</Typography>
                                    <Typography
                                        fontSize="1em"
                                        sx={{ fontStyle: "italic", color: "text.secondary" }}
                                    >
                                        {t.jobName}
                                    </Typography>
                                </Box>
                                <Box display="flex">
                                    <Button
                                        disabled={selected === t.id}
                                        onClick={() => {
                                            popupProps.close();
                                            //@ts-ignore
                                            setSelected(t.id);
                                        }}
                                    >
                                        Select
                                    </Button>
                                    <IconButton
                                        size="large"
                                        sx={{ color: "secondary.light" }}
                                        onClick={() => {
                                            navigate("/task/" + t.id);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        sx={{ color: "error.light" }}
                                        onClick={deletePopup.open}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <TaskDeletePopup
                                        popupProps={deletePopup}
                                        text={<>Deleting Task</>}
                                        handler={handleDelete}
                                        id={t.id}
                                    />
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography sx={{ py: 2, fontStyle: "italic" }}>No tasks found.</Typography>
                )}
                <Divider flexItem />
                <Button
                    variant="contained"
                    color="success"
                    sx={{ m: 1 }}
                    startIcon={<AddIcon />}
                    onClick={() => {
                        popupProps.close();
                        navigate({
                            pathname: "/task/new",
                            search: "location_id=" + matchedLocationId,
                        });
                    }}
                >
                    Add new task
                </Button>
            </Popover>
        </>
    );
}

type Props = {
    detector?: Detector;
    task?: OngoingTask;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
    selected: number;
    detectorId: number | undefined;
    parseDetectorState: (state: string) => Array<DetectorState>;
};

export default function DetectionControls({
    detector,
    task,
    setSelected,
    selected,
    detectorId,
    parseDetectorState,
}: Props) {
    const startDetectionPopup = usePopupState({ variant: "popover", popupId: "start-detection" });
    const tasksPopup = usePopupState({ variant: "popover", popupId: "tasks" });
    const noTasksPopup = usePopupState({ variant: "popover", popupId: "noTask" });
    const fetcher = useFetcher();

    const [time, setTime] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time + 1);
        }, 1000);
        return () => clearInterval(interval);
    });

    const api = new DetectorsApi();

    const instance = task?.ongoingInstance;

    let noDetector = detector === null;
    let detectorIsOff = !!detector && !!detector.state.find((s) => s === DetectorState.Off);

    let disabled = noDetector || detectorIsOff;

    let tooltip = noDetector
        ? "No detector is attached to the location"
        : detectorIsOff
        ? "Detector is offline"
        : "Start detection";

    const sendCommand = (commandMessage: string) => {
        const command: DetectorsCommandReq = {
            command: { msg: commandMessage, task_id: selected },
        };

        if (detector != undefined) {
            const req: ApiEndpointsDetectorsCommandRequest = {
                //@ts-ignore
                id: detectorId,
                detectorsCommandReq: command,
            };

            api.apiEndpointsDetectorsCommand(req);

            if (commandMessage === "start") {
                setTime(0);
            }
        }
    };

    return (
        <>
            <Paper
                sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    p: 2,
                }}
            >
                <Box
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    sx={{ width: "100%", mb: 2 }}
                >
                    <Title>Detection</Title>
                    <Box display="flex" gap={2}>
                        {!instance ? (
                            <Tooltip title={tooltip}>
                                <Box>
                                    <Button
                                        color="success"
                                        size="large"
                                        variant="contained"
                                        disabled={disabled}
                                        endIcon={<MenuOpenIcon />}
                                        onClick={(e) => {
                                            if (selected === -1) {
                                                noTasksPopup.open(e);
                                            } else {
                                                sendCommand("start");
                                            }
                                        }}
                                        sx={{ borderRadius: "24px", height: "48px" }}
                                    >
                                        Start detection
                                    </Button>
                                </Box>
                            </Tooltip>
                        ) : null}
                        {instance && instance.state === TaskInstanceState.Paused ? (
                            <>
                                <Tooltip title="Resume detection">
                                    <Fab
                                        size="medium"
                                        color="success"
                                        onClick={() => sendCommand("resume")}
                                    >
                                        <PlayArrowIcon />
                                    </Fab>
                                </Tooltip>
                                <Tooltip title="Stop detection">
                                    <Fab
                                        size="medium"
                                        color="error"
                                        onClick={() => sendCommand("stop")}
                                    >
                                        <StopIcon />
                                    </Fab>
                                </Tooltip>
                            </>
                        ) : null}
                        {instance && instance.state === TaskInstanceState.InProgress ? (
                            <>
                                <fetcher.Form method="post" action="send_command">
                                    <input
                                        readOnly
                                        hidden
                                        name="detector_id"
                                        value={detector?.id}
                                    />
                                    <input readOnly hidden name="command" value="pause" />
                                    <Tooltip title="Pause detection">
                                        <Fab
                                            size="medium"
                                            color="warning"
                                            onClick={() => sendCommand("pause")}
                                        >
                                            <PauseIcon />
                                        </Fab>
                                    </Tooltip>
                                </fetcher.Form>
                                <Tooltip title="Stop detection">
                                    <Fab
                                        size="medium"
                                        color="error"
                                        onClick={() => sendCommand("stop")}
                                    >
                                        <StopIcon />
                                    </Fab>
                                </Tooltip>
                            </>
                        ) : null}
                        <Button
                            startIcon={<FormatListBulletedIcon />}
                            sx={{ ml: 4 }}
                            variant="outlined"
                            size="large"
                            onClick={(e) => tasksPopup.open(e)}
                        >
                            Tasks
                        </Button>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" gap={1}>
                    <Box display="flex" flexWrap="wrap" gap={2}>
                        <LabeledValue
                            value={instance ? instance.state : "Inactive"}
                            label="Status"
                        />
                        {instance ? (
                            <>
                                <LabeledValue
                                    value={task.job.name}
                                    label="Job"
                                    icon={<HandymanIcon fontSize="large" />}
                                />
                                <LabeledValue value={task.name} label="Task" />
                                <LabeledValue
                                    value={`${String(Math.floor(time / 60)).padStart(
                                        2,
                                        "0"
                                    )}:${String(Math.floor(time % 60)).padStart(2, "0")}`}
                                    label="Total"
                                    icon={<AccessTimeIcon fontSize="large" />}
                                />
                                <LabeledValue value="00:11" label="Current step" />
                            </>
                        ) : null}
                    </Box>
                </Box>
            </Paper>
            <TasksPopup popupProps={tasksPopup} setSelected={setSelected} selected={selected} />
            <NoTaskPopup popupProps={noTasksPopup} />
        </>
    );
}
