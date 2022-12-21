import useResizeObserver from "@react-hook/resize-observer";
import { backend } from "api";
import { useEffect, useRef } from "react";
import { Detector } from "types";

import { Box } from "@mui/material";

type Props = {
    playing: boolean;
    detector?: Detector;
    setStreamFps: React.Dispatch<React.SetStateAction<number>>;
};

export default function Stream({ playing, detector, setStreamFps }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const frameCountRef = useRef(0);

    // TODO(rg):
    //  - img onload increments frame count
    //  - each second, setStreamFps is called with the current frame count; frame count is reset to
    //  0

    const source =
        playing && detector && detector.id
            ? `${backend}/api/v1/detectors/${detector.id}/stream`
            : "https://via.placeholder.com/640x360";

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
            <Box
                component="img"
                height="100%"
                width="100%"
                sx={{ boxShadow: 3 }}
                src={source}
                onLoad={() => console.count("load")}
            />
        </Box>
    );
}
