import { LabeledValue } from "components/LabeledValue";
import { useState } from "react";
import { Detector, DetectorState, TaskState } from "types";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HandymanIcon from "@mui/icons-material/Handyman";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Box, Fab, Paper, Tooltip, Typography } from "@mui/material";

type Props = {
    detector?: Detector;
};

export default function DetectionControls({ detector }: Props) {
    const [taskState, setTaskState] = useState<TaskState>(TaskState.Inactive);

    let noDetector = detector === null;
    let detectorIsOff = !!detector && !!detector.state.find((s) => s === DetectorState.Off);

    let disabled = noDetector || detectorIsOff;

    let tooltip = noDetector
        ? "No detector is attached to the location"
        : detectorIsOff
        ? "Detector is offline"
        : "Start detection";

    return (
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
                sx={{ width: "100%" }}
            >
                <Typography fontSize="1.2em" variant="overline" lineHeight={1}>
                    Detection
                </Typography>
                <Box display="flex" gap={2}>
                    {taskState !== TaskState.Active ? (
                        <Tooltip title={tooltip}>
                            <Box>
                                <Fab
                                    size="medium"
                                    color={"success"}
                                    disabled={disabled}
                                    onClick={() => setTaskState(TaskState.Active)}
                                >
                                    <PlayArrowIcon />
                                </Fab>
                            </Box>
                        </Tooltip>
                    ) : null}
                    {taskState === TaskState.Active ? (
                        <Tooltip title={"Pause detection"}>
                            <Fab
                                size="medium"
                                color={"warning"}
                                onClick={() => setTaskState(TaskState.Paused)}
                            >
                                <PauseIcon />
                            </Fab>
                        </Tooltip>
                    ) : null}
                    {taskState !== TaskState.Inactive ? (
                        <Tooltip title="Stop detection">
                            <Fab
                                size="medium"
                                color={"error"}
                                onClick={() => setTaskState(TaskState.Inactive)}
                            >
                                <StopIcon />
                            </Fab>
                        </Tooltip>
                    ) : null}
                </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" flexWrap="wrap" gap={2}>
                    <LabeledValue value={taskState} label="Status" />
                    {taskState !== TaskState.Inactive ? (
                        <>
                            <LabeledValue
                                value="KB1123Q"
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
    );
}
