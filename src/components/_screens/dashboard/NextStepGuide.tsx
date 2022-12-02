import { Paper, Typography } from "@mui/material";

export default function NextStepGuide() {
    return (
        <Paper sx={{ p: 2, pt: 0, minHeight: "240px" }}>
            <Typography fontSize="1.2em" variant="overline">
                Next Step
            </Typography>
        </Paper>
    );
}
