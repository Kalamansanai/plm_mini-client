import { LabeledValue } from "components/LabeledValue";
import { useState } from "react";
import { TaskState } from "types";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HandymanIcon from "@mui/icons-material/Handyman";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Box, Fab, Paper, Typography } from "@mui/material";

export default function DetectionControls() {
    const [taskState, setTaskState] = useState<TaskState>(TaskState.Inactive);

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
                        <Fab
                            size="medium"
                            color={"success"}
                            onClick={() => setTaskState(TaskState.Active)}
                        >
                            <PlayArrowIcon />
                        </Fab>
                    ) : null}
                    {taskState === TaskState.Active ? (
                        <Fab
                            size="medium"
                            color={"warning"}
                            onClick={() => setTaskState(TaskState.Paused)}
                        >
                            <PauseIcon />
                        </Fab>
                    ) : null}
                    {taskState !== TaskState.Inactive ? (
                        <Fab
                            size="medium"
                            color={"error"}
                            onClick={() => setTaskState(TaskState.Inactive)}
                        >
                            <StopIcon />
                        </Fab>
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
                        </>
                    ) : null}
                </Box>
                <Box display="flex" flexWrap="wrap" gap={2}>
                    {taskState !== TaskState.Inactive ? (
                        <>
                            <LabeledValue
                                value="00:49"
                                label="Total time"
                                icon={<AccessTimeIcon fontSize="large" />}
                            />
                            <LabeledValue value="00:11" label="Current step time" />
                            <LabeledValue value="5 / 16" label="Progress" />
                        </>
                    ) : null}
                </Box>
            </Box>
        </Paper>
    );
}
