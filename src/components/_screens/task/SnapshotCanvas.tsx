import { useEffect, useRef } from "react";
import { drawObject, editorDarkenOutsideRectangle } from "utils/canvas";

import { Box, useMediaQuery, useTheme } from "@mui/material";

import { EditedObject, Selection, State } from "./reducer";

type Props = {
    snapshot: Blob;
    state: State;
};

const useResizeListener = (callback: () => void) => {
    useEffect(() => {
        window.addEventListener("resize", callback);

        return () => window.removeEventListener("resize", callback);
    }, [callback]);
};

export default function SnapshotCanvas({ snapshot, state }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.up("lg"));

    const snapshotUrl = URL.createObjectURL(snapshot);
    const snapshotImage = new Image(640, 360);
    snapshotImage.src = snapshotUrl;
    snapshotImage.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = snapshotImage.width;
        canvas.height = snapshotImage.height;
        draw();
    };

    const draw = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;

        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const aspectRatio = snapshotImage.width / snapshotImage.height;
        const containerAspectRatio = container.clientWidth / container.clientHeight;

        if (isLg) {
            if (containerAspectRatio > aspectRatio) {
                canvas.width = Math.min(
                    container.clientHeight * aspectRatio,
                    container.clientWidth
                );
                canvas.height = container.clientHeight;
            } else {
                canvas.width = container.clientWidth;
                canvas.height = Math.min(
                    container.clientWidth / aspectRatio,
                    container.clientHeight
                );
            }
        } else {
            canvas.width = container.clientWidth;
            canvas.height = canvas.width / aspectRatio;
        }

        ctx.scale(canvas.width / snapshotImage.width, canvas.height / snapshotImage.height);

        ctx.drawImage(snapshotImage, 0, 0);

        state.task.objects
            .filter((o) => state.selection?.uuid !== o.uuid)
            .forEach((o) => {
                drawObject(snapshotImage, ctx, o, false, false);
            });

        if (state.selection?.uuid) {
            const selectedObject = state.task.objects.find((o) => state.selection!.uuid === o.uuid);

            if (selectedObject) {
                drawObject(snapshotImage, ctx, selectedObject, true, true);
            }
        }
    };

    useResizeListener(draw);

    const onMouseDown = () => {};

    const onMouseMove = () => {};

    const onMouseUp = () => {};

    return (
        <Box
            ref={containerRef}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                bgcolor: "black",
                boxShadow: 3,
            }}
        >
            <Box
                component="canvas"
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}
                onMouseMove={onMouseMove}
                onTouchMove={onMouseMove}
                onMouseUp={onMouseUp}
                onTouchEnd={onMouseUp}
            />
        </Box>
    );
}
