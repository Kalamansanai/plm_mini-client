import { LabeledValue } from "components/LabeledValue";
import Title from "components/Title";
import { useNavigate } from "react-router-dom";
import { OngoingTaskInstance } from "types";

import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import { Box, Button, Divider, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";

import EventCard from "./EventCard";

type Props = { instance?: OngoingTaskInstance; maxOrderNum?: number; location_id: number };

export default function TaskInstance({ instance, maxOrderNum, location_id }: Props) {
    const theme = useTheme();
    const isBelowXl = useMediaQuery(theme.breakpoints.down("xl"));
    const navigate = useNavigate();

    const disabled = !instance;

    const completedInstances = instance?.currentOrderNum ? instance?.currentOrderNum - 1 : 0;

    const progressPercent =
        instance && maxOrderNum !== undefined
            ? Math.floor((completedInstances * 100) / maxOrderNum)
            : 0;

    const goToPreviousInstances = () => {
        navigate(`../prev_instances/${location_id}`);
    };

    return (
        <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Box display="flex" flexDirection="column" flexGrow={1}>
                <Box display="flex" flexDirection="column" sx={{ p: 2 }}>
                    <Title sx={{ pb: 2 }}>Current instance</Title>
                    {!disabled ? (
                        <Box display="flex" gap={2}>
                            <LabeledValue
                                value={instance!.id}
                                label="ID"
                                icon={<Grid3x3Icon fontSize="large" />}
                            />
                            <LabeledValue
                                value={`${completedInstances} / ${maxOrderNum} (${progressPercent}%)`}
                                label="Progress"
                            />
                        </Box>
                    ) : null}
                </Box>
                {!disabled ? (
                    <>
                        <Title sx={{ p: 2 }}>Events</Title>
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
                <Button variant="outlined" size="large" onClick={goToPreviousInstances}>
                    View previous instances
                </Button>
            </Box>
        </Paper>
    );
}
