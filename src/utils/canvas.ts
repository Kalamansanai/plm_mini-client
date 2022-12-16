import { Object, type Template } from "../types";
import { bifilter } from "./bifilter";

// const TEMPLATE_COLOR = "#ff0";
// const SELECTED_TEMPLATE_COLOR = "#0f0";
// const TEMPLATE_LINE_WIDTH = 2;

const OBJECT_COLOR = "#ff0";
const SELECTED_OBJECT_COLOR = "#0f0";
const OBJECT_CIRCLE_SIZE = 12;
const OBJECT_DASH_COLOR = "#fff";
const OBJECT_LINE_WIDTH = 2;

// export const canvasActionTypes = {
//     none: 0,
//     resize: 1,
//     move: 2,
// };

// export const streamDrawTemplates = (
//     ctx: CanvasRenderingContext2D,
//     ts: Template[],
//     drawLabels: boolean
// ) => {
//     ctx.save();
//
//     const [tracked, untracked] = bifilter((t) => window.Object.keys(t).includes("present"), ts);
//
//     ctx.lineWidth = 4;
//     ctx.globalAlpha = 0.5;
//     untracked.forEach((t) => {
//         drawDashedTemplate(ctx, t, TEMPLATE_COLOR, "#444");
//         if (drawLabels) drawLabel(ctx, t.x, t.y, t.name);
//     });
//
//     ctx.globalAlpha = 1;
//     tracked.forEach((t) => {
//         drawDashedTemplate(ctx, t, TEMPLATE_COLOR, t.present ? "#0f0" : "#f00");
//         if (drawLabels) drawLabel(ctx, t.x, t.y, t.name);
//     });
//
//     ctx.restore();
// };

export const drawObject = (
    image: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
    object: Object,
    drawLabel: boolean,
    selected: boolean
) => {
    ctx.save();
    console.log(`draw ${object.name}`);

    ctx.lineWidth = OBJECT_LINE_WIDTH;

    const c = object.coordinates;

    if (selected) {
        focusObject(ctx, object, image);

        ctx.globalCompositeOperation = "screen";
        ctx.strokeStyle = SELECTED_OBJECT_COLOR;
        ctx.lineWidth = OBJECT_LINE_WIDTH;
        ctx.setLineDash([]);
        ctx.strokeRect(c.x, c.y, c.width, c.height);

        ctx.arc(c.x + c.width, c.y + c.height, OBJECT_CIRCLE_SIZE, 0, 2 * Math.PI);
        ctx.stroke();
    } else {
        ctx.globalCompositeOperation = "difference";
        ctx.strokeStyle = OBJECT_COLOR;
        ctx.setLineDash([]);
        ctx.strokeRect(c.x, c.y, c.width, c.height);

        ctx.globalCompositeOperation = "source-over";
        ctx.setLineDash([2 * ctx.lineWidth, 2 * ctx.lineWidth]);
        ctx.strokeStyle = OBJECT_DASH_COLOR;
        ctx.strokeRect(c.x, c.y, c.width, c.height);
    }

    if (drawLabel) drawObjectLabel(ctx, object);

    ctx.restore();
};

const focusObject = (ctx: CanvasRenderingContext2D, object: Object, image: HTMLImageElement) => {
    ctx.save();

    const cw = image.width;
    const ch = image.height;
    const c = object.coordinates;

    ctx.globalCompositeOperation = "darken";
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";

    // top
    ctx.fillRect(0, 0, cw, c.y);

    // left
    ctx.fillRect(0, c.y, c.x, c.height);

    // right
    ctx.fillRect(c.x + c.width, c.y, cw - c.x - c.width, c.height);

    // bottom
    ctx.fillRect(0, c.y + c.height, cw, ch - c.y - c.height);

    ctx.restore();
};

const drawObjectLabel = (ctx: CanvasRenderingContext2D, object: Object) => {
    ctx.save();

    ctx.globalCompositeOperation = "source-over";
    ctx.setLineDash([]);
    ctx.font = "12px sans-serif";
    ctx.lineWidth = OBJECT_LINE_WIDTH;

    const c = object.coordinates;

    const offset_x = 2;
    const offset_y = 4;
    const metrics = ctx.measureText(object.name);

    ctx.fillStyle = "#000";
    ctx.fillRect(
        c.x - offset_x,
        c.y - 2 * offset_y - metrics.actualBoundingBoxAscent,
        metrics.actualBoundingBoxRight + 4 * offset_x,
        metrics.actualBoundingBoxAscent + 2 * offset_y - 1
    );

    ctx.fillStyle = "#fff";
    ctx.fillText(object.name, c.x + offset_x, c.y - offset_y);

    ctx.restore();
};

export const getActionForTemplate = (x: number, y: number, t: Template) => {
    if (isInCircle(x, y, t.x + t.width, t.y + t.height, TEMPLATE_CIRCLE_SIZE)) {
        return { type: canvasActionTypes.resize, args: null };
    } else if (isInRectangle(x, y, t.x, t.y, t.width, t.height)) {
        const offset_x = x - t.x;
        const offset_y = y - t.y;
        return {
            type: canvasActionTypes.move,
            args: { offset_x: offset_x, offset_y: offset_y },
        };
    }

    return null;
};

const isBetween = (x: number, x1: number, x2: number) => {
    return x >= x1 && x <= x2;
};

const distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};

const isInRectangle = (x: number, y: number, rx: number, ry: number, rw: number, rh: number) => {
    return isBetween(x, rx, rx + rw) && isBetween(y, ry, ry + rh);
};

const isInCircle = (x: number, y: number, cx: number, cy: number, cr: number) => {
    const d = distance(x, y, cx, cy);
    return d < cr;
};
