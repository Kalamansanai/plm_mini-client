import useCHState, { encodeSelectedIds } from "companyHierarchyProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Station } from "types";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, IconButton, Tab, Tabs } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import TabPanel from "../../TabPanel";
import LocationCardsGrid from "./LocationCard";

export default function StationMenu({ station }: { station: Station }) {
    const [tab, setTab] = useState(0);
    const { state: chState } = useCHState();
    const navigate = useNavigate();

    const locations = station.locations;

    const detectors = locations.filter((l) => !!l.detector).map((l) => l.detector!);

    const onBack = () => {
        const sel = encodeSelectedIds(chState.selectedIds);
        navigate({ pathname: "/hierarchy", search: "sel=" + sel });
    };

    return (
        <Box display="flex" flexDirection="column" sx={{ height: "100%" }}>
            <Box display="flex" alignItems="center" sx={{ p: 1 }}>
                <IconButton onClick={onBack} sx={{ mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5">{station.name}</Typography>
            </Box>
            <Divider />
            <Tabs value={tab} onChange={(_e, value) => setTab(value)} variant="fullWidth">
                <Tab label="Locations" />
                <Tab label="Detectors" />
            </Tabs>
            <Divider />
            <TabPanel
                currentIndex={tab}
                index={0}
                flexDirection="column"
                gap={1}
                sx={{
                    p: 2,
                    flexGrow: 1,
                    height: 0,
                    overflowY: "auto",
                    backgroundColor: "background.subtle",
                }}
            >
                <LocationCardsGrid locations={locations} />
            </TabPanel>
            <TabPanel currentIndex={tab} index={1} sx={{ p: 1, flexGrow: 1 }}>
                <div>something</div>
            </TabPanel>
            <Divider />
            <Box>
                <IconButton>
                    <RefreshIcon />
                </IconButton>
            </Box>
        </Box>
    );
}
