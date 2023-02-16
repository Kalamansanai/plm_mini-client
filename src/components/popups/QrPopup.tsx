import { PopupState } from "material-ui-popup-state/core";
import { bindPopover } from "material-ui-popup-state/hooks";
import QRCode from "qrcode.react";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { FormMethod, useFetcher } from "react-router-dom";

import { Box, Button, Popover } from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = {
    popupProps: PopupState;
    handler: () => void;
    id: number;
};

export default function QrPopup({ popupProps, handler, id }: Props) {
    return (
        <Popover
            {...bindPopover(popupProps)}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
        >
            <QRCode id="qr-gen" value={`${id}`} size={290} level={"H"} includeMargin={true} />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <Button variant="text" sx={{ color: "greys.main" }} onClick={popupProps.close}>
                    Cancel
                </Button>
                <Button variant="text" color="error" onClick={handler}>
                    Download
                </Button>
            </Box>
        </Popover>
    );
}
