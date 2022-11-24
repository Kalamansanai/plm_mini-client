import useCHState, { Level } from "companyHierarchyProvider";
import {
    HealthIndicator,
    StateIndicator as DetectorStateIndicator,
} from "components/DetectorIndicators";
import { usePopupState } from "material-ui-popup-state/hooks";
import { useFetcher, useNavigate } from "react-router-dom";
import { Location } from "types";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import {
    Box,
    Card,
    CardActionArea,
    Chip,
    Divider,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";

import EditPopup from "../../popups/EditPopup";

type Props = {
    location: Location;
};

export default function LocationCardsGrid({ locations }: { locations: Array<Location> }) {
    const cards = locations.map((loc, i) => <LocationCard key={i} location={loc} />);
    const addPopup = usePopupState({ variant: "popover", popupId: "add-location" });
    const fetcher = useFetcher();

    const onAddSubmit = async (input: string) => {
        // TODO(rg): this should be a relative URL
        fetcher.submit({ name: input }, { method: "post", action: "/station/1/location/new" });
        return { close: true, resetText: true };
    };

    return (
        <>
            <Grid container flexGrow={1} spacing={1} alignContent="flex-start">
                {cards}
                <Grid item xs={6} sm={6} md={12}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            height: "120px",
                            border: "3px dashed",
                            borderRadius: "4px",
                            borderColor: "divider",
                            flexGrow: 1,
                        }}
                    >
                        <Tooltip title="New Location">
                            <IconButton onClick={(e) => addPopup.open(e)}>
                                <AddIcon sx={{ fontSize: 40, color: "primary.main" }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
            <EditPopup popupProps={addPopup} initialValue="" label="Name" handler={onAddSubmit} />
        </>
    );
}

function LocationCard({ location }: Props) {
    const { state: chState, dispatch: chDispatch } = useCHState();
    const navigate = useNavigate();

    const isSelected = chState.selectedIds[Level.Location] === location.id;

    const onClick = () => {
        if (chState.selectedIds[Level.Location] === location.id) {
            navigate("../..", { relative: "path" });
        } else {
            navigate(`location/${location.id}`);
        }
        chDispatch({ type: "SetSelectedId", level: Level.Location, id: location.id });
    };

    return (
        <Grid item xs={6} sm={6} md={12}>
            <Card
                elevation={0}
                sx={{
                    // Enough height to fit the button column - my first attempt was setting the
                    // button column width to 0, but that caused weird artifacts on the border
                    // (probably some pixels of the icon buttons were shown somewhy)
                    height: "120px",
                    flexShrink: 0,
                    display: "flex",
                    border: "1px solid",
                    borderColor: isSelected ? "primary.main" : "divider",
                    boxShadow: 1,
                }}
            >
                <CardActionArea
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        p: 1,
                        bgcolor: isSelected ? "primary.light" : "default",
                    }}
                    onClick={onClick}
                >
                    <Typography variant="h5">{location.name}</Typography>
                    {location.detector ? (
                        <>
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-between"
                                alignItems="flex-start"
                                sx={{ flexGrow: 1 }}
                            >
                                <Box display="flex" alignItems="center">
                                    <VideocamIcon sx={{ mr: 1, color: "text.secondary" }} />
                                    <Typography color="text.secondary" sx={{ fontSize: "1.2em" }}>
                                        {location.detector.name}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" gap={1}>
                                <DetectorStateIndicator state={location.detector.state} />
                            </Box>
                        </>
                    ) : null}
                </CardActionArea>
                <Box sx={{ display: isSelected ? "flex" : "flex" }} className="hover">
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: "primary.main" }} />
                    <Box display="flex" flexDirection="column" sx={{ height: "120px" }}>
                        <IconButton>
                            <PowerOffIcon />
                        </IconButton>
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Card>
        </Grid>
    );
}
