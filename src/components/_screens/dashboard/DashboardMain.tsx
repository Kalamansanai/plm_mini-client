import useResizeObserver from "@react-hook/resize-observer";
import { useEffect, useRef } from "react";

import { Box, Grid, Paper, useMediaQuery, useTheme } from "@mui/material";

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
        <Paper sx={{ m: 2, p: 2, flexGrow: 1 }}>
            <Box ref={containerRef}>
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
    return <div>"controls"</div>;
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
