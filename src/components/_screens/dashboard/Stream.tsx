import useResizeObserver from "@react-hook/resize-observer";
import { backend } from "api";
import { useEffect, useRef } from "react";
import { Detector } from "types";

import { Box } from "@mui/material";

export default function Stream({ playing, detector }: { playing: boolean; detector?: Detector }) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const source =
        playing && detector && detector.id
            ? `${backend}/api/v1/detectors/${detector.id}/stream`
            : "https://via.placeholder.com/640x360";

    console.log(playing);
    console.log(!!detector);
    console.log(detector!.id);

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

    return (
        <Box display="flex" alignItems="center" ref={containerRef} sx={{ bgcolor: "black" }}>
            <Box component="img" height="100%" width="100%" sx={{ boxShadow: 3 }} src={source} />
        </Box>
    );
}
