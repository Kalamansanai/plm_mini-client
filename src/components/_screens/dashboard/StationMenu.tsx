import { config as apiConfig } from "api";
import useCHState, { Level, State as CHState } from "companyHierarchyProvider";
import { usePopupState } from "material-ui-popup-state/hooks";
import { useState } from "react";
import { Params, useFetcher, useNavigate, useNavigation } from "react-router-dom";
import { Station } from "types";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Button, Card, IconButton, Tab, Tabs } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { LocationsApi } from "../../../api_client";
import TabPanel from "../../TabPanel";
import EditPopup from "../../popups/EditPopup";
import LocationCard from "./LocationCard";

export async function addLocationAction({ request, params }: { request: any; params: Params }) {
    const stationId = params["station_id"] as any as number;
    const data = await request.formData();
    const name = data.get("name");
    await new LocationsApi(apiConfig).apiEndpointsLocationsCreate({
        locationsCreateReq: { parentStationId: stationId, name },
    });
}

export default function StationMenu({ station }: { station: Station }) {
    const [tab, setTab] = useState(0);
    const { state: chState, dispatch: chDispatch } = useCHState();
    const navigate = useNavigate();
    const addPopup = usePopupState({ variant: "popover", popupId: "add-location" });
    const fetcher = useFetcher();

    const locations = station.locations;

    const detectors = locations.filter((l) => !!l.detector).map((l) => l.detector!);

    const cards = locations.map((loc, i) => <LocationCard key={i} location={loc} />);

    const onAddSubmit = async (input: string) => {
        // TODO(rg): this should be a relative URL
        fetcher.submit({ name: input }, { method: "post", action: "/station/1/location/new" });
        return { close: true, resetText: true };
    };

    const onBack = () => {
        chDispatch({ type: "SetSelectedId", level: Level.Location, id: null });
        navigate("/");
    };

    return (
        <>
            <Box display="flex" flexDirection="column" sx={{ height: "100%" }}>
                <Box display="flex" alignItems="center" sx={{ p: 1 }}>
                    <IconButton onClick={onBack} sx={{ mr: 1 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h5">{station.name}</Typography>
                </Box>
                <Divider />
                <Tabs value={tab} onChange={(e, value) => setTab(value)} variant="fullWidth">
                    <Tab label="Locations" />
                    <Tab label="Detectors" />
                </Tabs>
                <TabPanel
                    currentIndex={tab}
                    index={0}
                    flexDirection="column"
                    gap={1}
                    sx={{ p: 1, flexGrow: 1, height: 0, overflowY: "auto" }}
                >
                    {cards}
                    <Box display="flex" justifyContent="center">
                        <IconButton onClick={(e) => addPopup.open(e)}>
                            <AddIcon />
                        </IconButton>
                    </Box>
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
            <EditPopup popupProps={addPopup} initialValue="" label="Name" handler={onAddSubmit} />
        </>
    );
}
