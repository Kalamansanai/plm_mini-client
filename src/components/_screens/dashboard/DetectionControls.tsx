import { LabeledValue } from "components/LabeledValue";
import { useState } from "react";
import { TaskState } from "types";

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
                sx={{ width: "100%", pb: 3 }}
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
            <Box display="flex" gap={2}>
                <LabeledValue value={taskState} label="Status" />
                {taskState !== TaskState.Inactive ? (
                    <>
                        <LabeledValue value="KB1123Q" label="Job" icon={<HandymanIcon />} />
                        <LabeledValue value="4B" label="Task" icon={<HandymanIcon />} />
                    </>
                ) : null}
            </Box>
        </Paper>
    );
}
