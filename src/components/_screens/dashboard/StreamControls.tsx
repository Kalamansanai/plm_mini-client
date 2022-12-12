import { LabeledValue } from "components/LabeledValue";
import Title from "components/Title";
import { Detector, DetectorState } from "types";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Box, Fab, Paper, Tooltip, Typography } from "@mui/material";

type Props = {
    playing: boolean;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    detector?: Detector;
};

export default function StreamControls({ playing, setPlaying, detector }: Props) {
    let noDetector = detector === null;
    let detectorIsOff = !!detector && !!detector.state.find((s) => s === DetectorState.Off);

    let disabled = noDetector || detectorIsOff;

    let tooltip = noDetector
        ? "No detector is attached to the location"
        : detectorIsOff
        ? "Detector is offline"
        : playing
        ? "Stop stream"
        : "Start stream";

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
                sx={{ width: "100%", mb: 2 }}
            >
                <Title>Stream</Title>
                <Tooltip title={tooltip}>
                    <Box>
                        <Fab
                            size="medium"
                            color={playing ? "error" : "success"}
                            disabled={disabled}
                            onClick={() => setPlaying(!playing)}
                        >
                            {playing ? <StopIcon /> : <PlayArrowIcon />}
                        </Fab>
                    </Box>
                </Tooltip>
            </Box>
            <Box display="flex" gap={2}>
                <LabeledValue value="Active" label="Status" />
                <LabeledValue value={60} label="FPS" />
            </Box>
        </Paper>
    );
}
