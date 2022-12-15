import Title from "components/Title";
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
                minHeight: "240px",
            }}
        >
            <Title sx={{ pb: 1 }}>Next step</Title>
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
                    instance.currentOrderNumRemainingSteps.map((s, i) => {
                        const actionString = GetStepActionString(
                            s.expectedInitialState,
                            s.expectedSubsequentState
                        );
                        const color =
                            actionString === "remove"
                                ? "error.main"
                                : actionString === "replace"
                                ? "info.main"
                                : "text.default";

                        return (
                            <Typography
                                key={i}
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
