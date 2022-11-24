import useResizeObserver from "@react-hook/resize-observer";
import { LabeledValue } from "components/LabeledValue";
import { useEffect, useRef, useState } from "react";
import { randomBetween } from "utils/random";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Divider, Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";

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
        <Paper sx={{ m: 2, p: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <Box display="flex" justifyContent="center" alignItems="center" ref={containerRef}>
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
            <Controls />
        </Paper>
    );
}

function Controls() {
    // Testing LabeledValue flash animation with random changes
    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        const nextDelay = randomBetween(1, 3);

        setTimeout(() => {
            setValue(value + 1);
        }, nextDelay * 1000);
    }, [value]);
    return (
        <Grid container flexGrow={1}>
            <Grid
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
                item
                xs={12}
                xl={4}
            >
                <Typography fontSize="1.2em" variant="overline">
                    Stream
                </Typography>
                <Box display="flex" gap={2}>
                    <LabeledValue value={60} label="FPS" />
                    <LabeledValue value="Running" label="Status" />
                </Box>
            </Grid>
            <Grid
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
                item
                xs={12}
                xl={8}
            >
                <Typography fontSize="1.2em" variant="overline">
                    Detection
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" gap={2}>
                        <LabeledValue value="KB1123Q-4B" label="Task" />
                        <LabeledValue value={value} label="Step" animate />
                    </Box>
                    <Box display="flex" gap={2}>
                        <LabeledValue value="00:49" label="Total time" icon={<AccessTimeIcon />} />
                        <LabeledValue value="00:11" label="Current time" />
                        <LabeledValue value="5 / 16" label="Progress" />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

function Events() {
    return <Paper sx={{ m: 2, flexGrow: 1 }}>events</Paper>;
}

export default function DashboardMain() {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <Grid
                display="flex"
                flexDirection="column"
                alignContent="flex-start"
                gap={2}
                item
                xs={12}
                sm={12}
                md={8}
            >
                <Stream />
            </Grid>
            <Grid display="flex" flexDirection="column" item xs={12} sm={12} md={4}>
                <Events />
            </Grid>
        </>
    );
}
