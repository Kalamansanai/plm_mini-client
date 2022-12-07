import { OngoingTaskInstance, Step, GetStepActionString } from "types";

import { Box, Paper, Typography } from "@mui/material";

type Props = {
    instance?: OngoingTaskInstance;
};

export default function NextStepGuide({ instance }: Props) {
    const disabled = !instance;

    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                pt: 0,
                minHeight: "240px",
            }}
        >
            <Typography fontSize="1.2em" variant="overline">
                Next Step
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "4px dashed",
                    borderColor: disabled ? "background.subtle" : "primary.light",
                    flexGrow: 1,
                }}
            >
                {disabled ? (
                    <Typography fontSize="1.4em" sx={{ fontFamily: "monospace" }}>
                        No task is running
                    </Typography>
                ) : (
                    instance.currentOrderNumRemainingSteps.map((s) => (
                        <Typography fontSize="1.4em" sx={{ fontFamily: "monospace" }}>
                            {GetStepActionString(s)} {s.object.name}
                        </Typography>
                    ))
                )}
            </Box>
        </Paper>
    );
}
