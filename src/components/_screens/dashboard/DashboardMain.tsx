import useResizeObserver from "@react-hook/resize-observer";
import { LabeledValue } from "components/LabeledValue";
import { useEffect, useRef, useState } from "react";
import { randomBetween } from "utils/random";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HandymanIcon from "@mui/icons-material/Handyman";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import {
    Box,
    Divider,
    Fab,
    Grid,
    IconButton,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

function Stream() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useResizeObserver(containerRef, (_) => {
        // adjustVideoSize();
    });

    useEffect(() => {
        // adjustVideoSize();
    }, []);

    const adjustVideoSize = () => {
        const elem = containerRef.current;
        const video = videoRef.current;
        if (!elem || !video) return;

        console.log(`Container: ${elem.clientWidth}x${elem.clientHeight}`);

        video.width = elem.clientWidth - 48;
        video.height = elem.clientHeight - 48;
    };

    const placeholderVideo = (
        <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
            type="video/webm"
        />
    );

    const realVideo = <source src="http://127.0.0.1:3000/stream" type="video/x-motion-jpeg" />;

    return (
        <Box display="flex" alignItems="center" ref={containerRef}>
            <Box
                component="video"
                ref={videoRef}
                height="100%"
                width="100%"
                autoPlay
                loop
                controls
                sx={{ boxShadow: 3 }}
            >
                {placeholderVideo}
            </Box>
        </Box>
    );
}

function StreamControls({
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

type DetectionState = "Active" | "Paused" | "Inactive";

function DetectionControls() {
    const [detectionState, setDetectionState] = useState<DetectionState>("Inactive");

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
                    {detectionState !== "Active" ? (
                        <Fab
                            size="medium"
                            color={"success"}
                            onClick={() => setDetectionState("Active")}
                        >
                            <PlayArrowIcon />
                        </Fab>
                    ) : null}
                    {detectionState === "Active" ? (
                        <Fab
                            size="medium"
                            color={"warning"}
                            onClick={() => setDetectionState("Paused")}
                        >
                            <PauseIcon />
                        </Fab>
                    ) : null}
                    {detectionState !== "Inactive" ? (
                        <Fab
                            size="medium"
                            color={"error"}
                            onClick={() => setDetectionState("Inactive")}
                        >
                            <StopIcon />
                        </Fab>
                    ) : null}
                </Box>
            </Box>
            <Box display="flex" gap={2}>
                <LabeledValue value={detectionState} label="Status" />
                {detectionState !== "Inactive" ? (
                    <>
                        <LabeledValue value="KB1123Q" label="Job" icon={<HandymanIcon />} />
                        <LabeledValue value="4B" label="Task" icon={<HandymanIcon />} />
                    </>
                ) : null}
            </Box>
        </Paper>
    );
}

function CurrentTask() {
    // Testing LabeledValue flash animation with random changes
    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        const nextDelay = randomBetween(1, 3);

        setTimeout(() => {
            setValue(value + 1);
        }, nextDelay * 1000);
    }, [value]);

    return (
        <Paper sx={{ p: 2, pt: 0, height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography fontSize="1.2em" variant="overline">
                Current Task
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
                <LabeledValue value={value} label="Step" animate />
                <LabeledValue value="00:49" label="Total time" icon={<AccessTimeIcon />} />
                <LabeledValue value="00:11" label="Current time" />
                <LabeledValue value="5 / 16" label="Progress" />
            </Box>
        </Paper>
    );
}

export default function DashboardMain() {
    const theme = useTheme();
    const [playing, setPlaying] = useState(false);

    const isMd = useMediaQuery(theme.breakpoints.down("lg"));

    return (
        <Grid container spacing={2} height="100%">
            <Grid display="flex" flexDirection="column" gap={2} item xs={12} md={12} lg={8}>
                <Stream />
                <Grid container spacing={2} flexGrow={1}>
                    <Grid item xs={12} sm={4} md={4} lg={12} xl={4}>
                        <StreamControls playing={playing} setPlaying={setPlaying} />
                    </Grid>
                    <Grid item xs={12} sm={8} md={8} lg={12} xl={8}>
                        <DetectionControls />
                    </Grid>
                </Grid>
                {isMd ? <CurrentTask /> : null}
            </Grid>
            {!isMd ? (
                <Grid item lg={4} sx={{ height: "100%" }}>
                    <CurrentTask />
                </Grid>
            ) : null}
        </Grid>
    );
}
