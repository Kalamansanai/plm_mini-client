import { PopupState } from "material-ui-popup-state/core";
import { bindPopover } from "material-ui-popup-state/hooks";
import { FormMethod, useFetcher } from "react-router-dom";

import { Box, Button, Popover } from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = {
    popupProps: PopupState;
    text: React.ReactNode | string;
    method: FormMethod;
    action: string;
    children?: React.ReactNode;
};

export default function ConfirmPopup({ popupProps, text, method, action, children }: Props) {
    const fetcher = useFetcher();

    return (
        <Popover {...bindPopover(popupProps)} anchorReference="anchorPosition">
            <Typography sx={{ m: 2 }}>{text}. Are you sure?</Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <fetcher.Form method={method} action={action} onSubmit={popupProps.close}>
                    {children}
                    <Button
                        type="button"
                        variant="text"
                        sx={{ color: "greys.main" }}
                        onClick={popupProps.close}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="text" color="error">
                        Ok
                    </Button>
                </fetcher.Form>
            </Box>
        </Popover>
    );
}
