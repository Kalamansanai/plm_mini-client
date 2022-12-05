import { OngoingTaskInstance, Step } from "types";

import { Paper, Typography } from "@mui/material";

type Props = {
    steps: Array<Step> | null;
};

export default function NextStepGuide({ steps }: Props) {
    return (
        <Paper sx={{ p: 2, pt: 0, minHeight: "240px" }}>
            <Typography fontSize="1.2em" variant="overline">
                Next Step
            </Typography>
        </Paper>
    );
}
