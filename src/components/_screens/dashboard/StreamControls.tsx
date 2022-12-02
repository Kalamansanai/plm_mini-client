import { LabeledValue } from "components/LabeledValue";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Box, Fab, Paper, Typography } from "@mui/material";

export default function StreamControls({
    playing,
    setPlaying,
}: {
    playing: boolean;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
                    Stream
                </Typography>
                <Fab
                    size="medium"
                    color={playing ? "error" : "success"}
                    onClick={() => setPlaying(!playing)}
                >
                    {playing ? <StopIcon /> : <PlayArrowIcon />}
                </Fab>
            </Box>
            <Box display="flex" gap={2}>
                <LabeledValue value="Active" label="Status" />
                <LabeledValue value={60} label="FPS" />
            </Box>
        </Paper>
    );
}
