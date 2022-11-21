import { PopupState } from "material-ui-popup-state/core";
import { bindPopover } from "material-ui-popup-state/hooks";
import { useEffect, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import { IconButton, Popover, TextField } from "@mui/material";

type Props = {
    popupProps: PopupState;
    initialValue: string;
    label: string;
    handler: (input: string) => Promise<boolean>;
};

// TODO: setting initial state might be wrong this way
export default function RenamePopup({ popupProps, initialValue, label, handler }: Props) {
    const [input, setInput] = useState(initialValue);

    const onKeyboardSubmit = (e: React.KeyboardEvent) => {
        if (e.key !== "Enter") return;
        if (!input) return;

        onSubmit();
    };

    const onMouseSubmit = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!input) return;

        onSubmit();
    };

    const onSubmit = async () => {
        const ok = await handler(input);

        if (ok) {
            popupProps.close();
        }
    };

    const popoverProps = bindPopover(popupProps);

    return (
        <Popover
            {...popoverProps}
            anchorReference="anchorPosition"
            onClose={() => {
                popoverProps.onClose();
                setInput(initialValue);
            }}
        >
            <TextField
                label={label}
                variant="filled"
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={onKeyboardSubmit}
                onClick={(e) => e.stopPropagation()}
            />
            <IconButton sx={{ color: "success.light" }} disabled={!input} onClick={onMouseSubmit}>
                <CheckIcon />
            </IconButton>
        </Popover>
    );
}
