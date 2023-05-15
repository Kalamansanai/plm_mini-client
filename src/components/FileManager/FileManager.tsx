import { Grid } from "@mui/material";

import FileUploadSingle from "./FileUploadSingle";

export default function FileUploadManager() {
    return (
        <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%", width: "100%" }}
        >
            <Grid
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ borderRadius: 3, backgroundColor: "white", height: "60%", width: "40%" }}
            >
                <FileUploadSingle></FileUploadSingle>
            </Grid>
        </Grid>
    );
}
