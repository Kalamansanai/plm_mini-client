import { backend } from "api";
import { useEffect, useRef, useState } from "react";
import { CanvasAction, drawObject, getAction } from "utils/canvas";

import { Box, useMediaQuery, useTheme } from "@mui/material";

import { Action, EditedObject, Selection, State } from "./reducer";

type Props = {
    snapshot: Blob;
    state: State;
    dispatch: React.Dispatch<Action>;
};

const useResizeListener = (callback: () => void) => {
    useEffect(() => {
        window.addEventListener("resize", callback);

        return () => window.removeEventListener("resize", callback);
    }, [callback]);
};

// TODO(rg): event handlers for touch events on canvas
export default function SnapshotCanvas({ snapshot, state, dispatch }: Props) {
    const [action, setAction] = useState<CanvasAction>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.up("lg"));

    const snapshotUrl = URL.createObjectURL(snapshot);
    // const snapshotUrl = `${backend}/api/v1/detectors/${3}/stream`;
    const snapshotImage = new Image(640, 360);
    snapshotImage.src = snapshotUrl;
    snapshotImage.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = snapshotImage.width;
        canvas.height = snapshotImage.height;
        draw();
    };

    const getActualMouseCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // TS doesn't recognize that HTML canvas element has `offsetLeft`, etc. properties
        const target = e.target as any;

        const x_scale = canvas.width / snapshotImage.width;
        const y_scale = canvas.height / snapshotImage.height;

        const x = Math.round((e.clientX - target.offsetLeft + window.scrollX) / x_scale);
        const y = Math.round((e.clientY - target.offsetTop + window.scrollY) / y_scale);

        return [x, y];
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
            console.log(selectedObject);
            if (selectedObject) {
                drawObject(snapshotImage, ctx, selectedObject, true, true);
            }
        }
    };

    useResizeListener(draw);

    const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const mouse = getActualMouseCoords(e);
        if (!mouse) return;

        const [x, y] = mouse;

        // When there are multiple intersecting objects, and one of them is selected,
        // we presume the user wants to interact with the selected one when clicking in the
        // intersection. Therefore, we first check the selected objects, and then the others
        let objectsWithSelectedFirst = state.task.objects.filter(
            (o) => state.selection?.uuid !== o.uuid
        );

        if (state.selection?.uuid) {
            const selectedObject = state.task.objects.find((o) => state.selection!.uuid === o.uuid);
            if (selectedObject) objectsWithSelectedFirst.splice(0, 0, selectedObject);
        }

        for (const o of objectsWithSelectedFirst) {
            const action = getAction(x!, y!, o);
            if (action) {
                setAction(action);
                if (state.selection?.uuid !== o.uuid)
                    dispatch({
                        type: "Select",
                        selection: { uuid: o.uuid, selectionType: "object" },
                    });

                return;
            }
        }

        setAction(null);
        dispatch({ type: "Select", selection: null });
    };

    const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const mouse = getActualMouseCoords(e);
        if (!mouse) return;

        const [x, y] = mouse;

        if (!state.selection) return;

        const selectedObject = state.task.objects.find((o) => state.selection?.uuid === o.uuid);

        if (!selectedObject || !action) return;

        if (action.type === "Resize") {
            const newCoords = { ...selectedObject.coordinates };
            newCoords.width = Math.max(8, x! - newCoords.x);
            newCoords.height = Math.max(8, y! - newCoords.y);
            dispatch({
                type: "EditObject",
                name: selectedObject.name,
                uuid: selectedObject.uuid,
                coordinates: newCoords,
            });
        } else if (action.type === "Move") {
            const newCoords = { ...selectedObject.coordinates };
            newCoords.x = x! - action.offset_x;
            newCoords.y = y! - action.offset_y;

            if (newCoords.x < 0) newCoords.x = 0;
            if (newCoords.y < 0) newCoords.y = 0;
            if (newCoords.x + newCoords.width > snapshotImage.width)
                newCoords.x = snapshotImage.width - newCoords.width;
            if (newCoords.y + newCoords.height > snapshotImage.height)
                newCoords.y = snapshotImage.height - newCoords.height;

            dispatch({
                type: "EditObject",
                name: selectedObject.name,
                uuid: selectedObject.uuid,
                coordinates: newCoords,
            });
        }
    };

    const onMouseUp = () => {
        setAction(null);
    };

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
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
            />
        </Box>
    );
}
