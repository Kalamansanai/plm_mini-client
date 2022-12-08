import { LocationsGetTasksResTaskRes } from "api_client";
import { LabeledValue } from "components/LabeledValue";
import { bindPopover, PopupState } from "material-ui-popup-state/core";
import { usePopupState } from "material-ui-popup-state/hooks";
import { useEffect, useState } from "react";
import { Params, useFetcher, useLocation } from "react-router-dom";
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
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function TasksPopup({ popupProps, setLoading }: TasksPopupProps) {
    const fetcher = useFetcher();
    const location = useLocation();

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
        setLoading(true);
        return null;
    }

    setLoading(false);

    return (
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
            <List>
                {tasks
                    ? tasks.map((t, i) => (
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
                                  <IconButton sx={{ color: "secondary.light" }}>
                                      <EditIcon />
                                  </IconButton>
                                  <IconButton sx={{ color: "error.light" }}>
                                      <DeleteIcon />
                                  </IconButton>
                              </Box>
                          </ListItem>
                      ))
                    : null}
            </List>
            <Divider flexItem />
            <Button variant="contained" color="success" sx={{ m: 1 }} startIcon={<AddIcon />}>
                Add new task
            </Button>
        </Popover>
    );
}

type Props = {
    detector?: Detector;
    task?: OngoingTask;
};

export default function DetectionControls({ detector, task }: Props) {
    const startDetectionPopup = usePopupState({ variant: "popover", popupId: "start-detection" });
    const tasksPopup = usePopupState({ variant: "popover", popupId: "tasks" });
    const fetcher = useFetcher();

    const [tasksPopupLoading, setTasksPopupLoading] = useState(false);

    const instance = task?.ongoingInstance;

    let noDetector = detector === null;
    let detectorIsOff = !!detector && !!detector.state.find((s) => s === DetectorState.Off);

    let disabled = noDetector || detectorIsOff;

    let tooltip = noDetector
        ? "No detector is attached to the location"
        : detectorIsOff
        ? "Detector is offline"
        : "Start detection";

    const onStart = () => {};

    const onStop = () => {};

    const onResume = () => {};

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
                    <Typography fontSize="1.2em" variant="overline" lineHeight={1}>
                        Detection
                    </Typography>
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
                                        onClick={onStart}
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
                                    <Fab size="medium" color="success" onClick={onResume}>
                                        <PlayArrowIcon />
                                    </Fab>
                                </Tooltip>
                                <Tooltip title="Stop detection">
                                    <Fab size="medium" color="error" onClick={onStop}>
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
                                        <Fab size="medium" color="warning" type="submit">
                                            <PauseIcon />
                                        </Fab>
                                    </Tooltip>
                                </fetcher.Form>
                                <Tooltip title="Stop detection">
                                    <Fab size="medium" color="error" onClick={onStop}>
                                        <StopIcon />
                                    </Fab>
                                </Tooltip>
                            </>
                        ) : null}
                        <LoadingButton
                            loading={tasksPopupLoading}
                            loadingPosition="start"
                            startIcon={<FormatListBulletedIcon />}
                            sx={{ ml: 4 }}
                            variant="outlined"
                            size="large"
                            onClick={(e) => tasksPopup.open(e)}
                        >
                            Tasks
                        </LoadingButton>
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
                                <LabeledValue value="4B" label="Task" />
                                <LabeledValue
                                    value="00:49"
                                    label="Total"
                                    icon={<AccessTimeIcon fontSize="large" />}
                                />
                                <LabeledValue value="00:11" label="Current step" />
                            </>
                        ) : null}
                    </Box>
                </Box>
            </Paper>
            <TasksPopup popupProps={tasksPopup} setLoading={setTasksPopupLoading} />
        </>
    );
}
