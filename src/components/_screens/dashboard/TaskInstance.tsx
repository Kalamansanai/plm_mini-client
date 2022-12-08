import { LabeledValue } from "components/LabeledValue";
import { OngoingTaskInstance } from "types";

import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import { Box, Button, Divider, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";

import EventCard from "./EventCard";

type Props = { instance?: OngoingTaskInstance; maxOrderNum?: number };

export default function TaskInstance({ instance, maxOrderNum }: Props) {
    const theme = useTheme();
    const isBelowXl = useMediaQuery(theme.breakpoints.down("xl"));

    const disabled = !instance;

    const progressPercent =
        instance && maxOrderNum !== undefined
            ? Math.floor((instance.currentOrderNum * 100) / maxOrderNum)
            : 0;

    return (
        <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Box display="flex" flexDirection="column" flexGrow={1}>
                <Box sx={{ p: 2, pt: 0 }}>
                    <Typography fontSize="1.2em" variant="overline">
                        Current Instance
                    </Typography>
                    {!disabled ? (
                        <Box display="flex" gap={2}>
                            <LabeledValue
                                value={instance!.id}
                                label="ID"
                                icon={<Grid3x3Icon fontSize="large" />}
                            />
                            <LabeledValue
                                value={`${instance?.currentOrderNum} / ${maxOrderNum} (${progressPercent}%)`}
                                label="Progress"
                            />
                        </Box>
                    ) : null}
                </Box>
                {!disabled ? (
                    <>
                        <Typography fontSize="1.2em" variant="overline" sx={{ px: 2 }}>
                            Events
                        </Typography>
                        <Divider flexItem />
                        <Box
                            flexGrow={1}
                            sx={{
                                p: 1,
                                height: isBelowXl ? "480px" : 0,
                                overflowY: "auto",
                                bgcolor: "background.subtle",
                            }}
                        >
                            <Box display="flex" flexDirection="column" gap={1}>
                                {instance!.events
                                    .sort((e1, e2) => (e1.timestamp < e2.timestamp ? 1 : -1))
                                    .map((e) => (
                                        <EventCard key={e.id} event={e} />
                                    ))}
                            </Box>
                        </Box>
                    </>
                ) : null}
            </Box>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={1}>
                <Button variant="outlined" size="large">
                    View previous instances
                </Button>
            </Box>
        </Paper>
    );
}
