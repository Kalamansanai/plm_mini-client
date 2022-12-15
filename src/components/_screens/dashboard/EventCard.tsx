import { Event, GetStepActionString } from "types";
import { formatDate } from "utils/time";

import Check from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Card, Divider, Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";

export default function EventCard({ event }: { event: Event }) {
    const actionString = GetStepActionString(
        event.step.expectedInitialState,
        event.step.expectedSubsequentState
    );

    const timestampDate = new Date(event.timestamp);

    return (
        <Card
            elevation={1}
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 1,
                bgcolor: event.success ? "background.paper" : red[100],
            }}
        >
            <Box display="flex">
                <Box flexGrow={1}>
                    <Typography fontSize="1.3em" sx={{ fontFamily: "monospace" }}>
                        {actionString} {event.step.object.name}
                    </Typography>
                    <Typography fontSize="1em" sx={{ color: "text.secondary" }}>
                        {formatDate(timestampDate)}
                    </Typography>
                </Box>
                <Box alignSelf="center">
                    {event.success ? (
                        <CheckCircleOutlineIcon fontSize="large" sx={{ color: "primary.main" }} />
                    ) : (
                        <ErrorOutlineIcon fontSize="large" sx={{ color: "error.main" }} />
                    )}
                </Box>
            </Box>
            {!event.success ? (
                <>
                    <Divider flexItem sx={{ my: 0.5 }} />
                    <Typography fontSize="1em" sx={{ color: "error.dark", fontStyle: "italic" }}>
                        {event.failureReason}
                    </Typography>
                </>
            ) : null}
        </Card>
    );
}
