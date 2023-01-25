import { PopupState } from "material-ui-popup-state/core";
import { bindPopover } from "material-ui-popup-state/hooks";

import { Box, Button, Popover, Typography } from "@mui/material";

type Props = {
    popupProps: PopupState;
};

export default function InvalidPasswordPopup({ popupProps }: Props) {
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
            <Box
                sx={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "red",
                    width: "200px",
                    height: "60px",
                }}
            >
                <Typography>Invalid Password</Typography>
            </Box>
        </Popover>
    );
}
