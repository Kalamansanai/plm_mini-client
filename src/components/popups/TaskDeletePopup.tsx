import { PopupState } from "material-ui-popup-state/core";
import { bindPopover } from "material-ui-popup-state/hooks";
import { FormMethod, useFetcher } from "react-router-dom";

import { Box, Button, Popover } from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = {
    popupProps: PopupState;
    text: React.ReactNode | string;
    handler: any;
    id: number | undefined;
};

export default function TaskDeletePopup({ popupProps, text, handler, id }: Props) {
    const fetcher = useFetcher();

    return (
        <Popover {...bindPopover(popupProps)} anchorReference="anchorPosition">
            <Typography sx={{ m: 2 }}>{text}. Are you sure?</Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Button
                    type="button"
                    variant="text"
                    sx={{ color: "greys.main" }}
                    onClick={popupProps.close}
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    variant="text"
                    color="error"
                    onClick={() => {
                        popupProps.close();
                        handler(id);
                    }}
                >
                    Ok
                </Button>
            </Box>
        </Popover>
    );
}
