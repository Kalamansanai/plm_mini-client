import { PopupState } from "material-ui-popup-state/core";
import { bindPopover } from "material-ui-popup-state/hooks";
import { useEffect, useState } from "react";
import { FormMethod, useFetcher } from "react-router-dom";

import CheckIcon from "@mui/icons-material/Check";
import { IconButton, Popover, TextField } from "@mui/material";

export type EditPopupResult = {
    close: boolean;
    resetText: boolean;
};

type Props = {
    popupProps: PopupState;
    label: string;
    initialValue: string;
    method: FormMethod;
    action: string;
    children?: React.ReactNode;
};

export default function SingleInputPopup({
    popupProps,
    label,
    initialValue,
    method,
    action,
    children,
}: Props) {
    const fetcher = useFetcher();

    return (
        <Popover {...bindPopover(popupProps)} anchorReference="anchorPosition">
            <fetcher.Form method={method} action={action} onSubmit={popupProps.close}>
                {children}
                <TextField
                    label={label}
                    name={label.toLowerCase()}
                    variant="filled"
                    autoFocus
                    defaultValue={initialValue}
                />
                <IconButton type="submit" sx={{ color: "success.light" }}>
                    <CheckIcon />
                </IconButton>
            </fetcher.Form>
        </Popover>
    );
}
