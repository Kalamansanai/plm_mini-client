import useResizeObserver from "@react-hook/resize-observer";
import { useEffect, useRef } from "react";

import { Box } from "@mui/material";

export default function Stream() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const imgSource = "https://via.placeholder.com/640x360";

    useResizeObserver(containerRef, (_) => {
        adjustVideoSize();
    });

    useEffect(() => {
        adjustVideoSize();
    }, []);

    const adjustVideoSize = () => {
        const elem = containerRef.current;
        if (!elem) return;

        const newHeight = (elem.clientWidth * 9) / 16;

        elem.style.height = newHeight + "px";
    };

    const placeholderVideo = (
        <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
            type="video/webm"
        />
    );

    const realVideo = <source src="http://127.0.0.1:3000/stream" type="video/x-motion-jpeg" />;

    return (
        <Box display="flex" alignItems="center" ref={containerRef} sx={{ bgcolor: "black" }}>
            <Box component="img" height="100%" width="100%" src={imgSource} sx={{ boxShadow: 3 }} />
        </Box>
    );
}
