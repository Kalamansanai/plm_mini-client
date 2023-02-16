import { bindDialog, PopupState } from "material-ui-popup-state/core";
import { bindPopover } from "material-ui-popup-state/hooks";
import { FormMethod, useFetcher } from "react-router-dom";

import { Box, Button, Popover } from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = {
    popupProps: PopupState;
};

export default function NoTaskPopup({ popupProps }: Props) {
    const fetcher = useFetcher();

    return (
        <Popover {...bindPopover(popupProps)} anchorReference="anchorPosition">
            <Typography sx={{ m: 2 }}>No Task Selected!</Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Button onClick={popupProps.close} type="submit" variant="text" color="error">
                    Ok
                </Button>
            </Box>
        </Popover>
    );
}
