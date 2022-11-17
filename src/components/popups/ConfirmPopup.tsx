import { PopupState } from "material-ui-popup-state/core";
import { bindPopover } from "material-ui-popup-state/hooks";

import { Box, Button, Popover } from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = {
    popupProps: PopupState;
    text: React.ReactElement;
    handler: (e: React.MouseEvent) => void;
};

export default function ConfirmPopup({ popupProps, text, handler }: Props) {
    return (
        <Popover {...bindPopover(popupProps)}>
            <Typography sx={{ m: 2 }}>{text}. Are you sure?</Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Button variant="text" sx={{ color: "greys.main" }} onClick={popupProps.close}>
                    Cancel
                </Button>
                <Button variant="text" color="error" onClick={handler}>
                    Ok
                </Button>
            </Box>
        </Popover>
    );
}
