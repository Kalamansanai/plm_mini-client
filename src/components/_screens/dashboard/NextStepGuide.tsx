import { OngoingTaskInstance, GetStepActionString } from "types";

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
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    height: 0,
                    overflowY: "auto",
                    border: "4px dashed",
                    borderColor: disabled ? "background.subtle" : "primary.light",
                    flexGrow: 1,
                }}
            >
                {disabled ? (
                    <Typography fontSize="1.8em" sx={{ fontFamily: "monospace" }}>
                        No task is running
                    </Typography>
                ) : (
                    instance.currentOrderNumRemainingSteps.map((s) => {
                        const actionString = GetStepActionString(s);
                        const color =
                            actionString === "remove"
                                ? "error.main"
                                : actionString === "replace"
                                ? "info.main"
                                : "text.default";

                        return (
                            <Typography
                                fontSize="1.8em"
                                sx={{ fontFamily: "monospace", color: color }}
                            >
                                {actionString}{" "}
                                <Box component="span" sx={{ color: "primary.main" }}>
                                    {s.object.name}
                                </Box>
                            </Typography>
                        );
                    })
                )}
            </Box>
        </Paper>
    );
}
