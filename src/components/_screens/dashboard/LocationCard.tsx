import useCHState, { Level } from "companyHierarchyProvider";
import { StateIndicator as DetectorStateIndicator } from "components/DetectorIndicators";
import ConfirmPopup from "components/popups/ConfirmPopup";
import SingleInputPopup from "components/popups/SingleInputPopup";
import { usePopupState } from "material-ui-popup-state/hooks";
import { useFetcher, useMatch, useMatches, useNavigate, useParams } from "react-router-dom";
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

type Props = {
    location: Location;
};

export default function LocationCardsGrid({ locations }: { locations: Array<Location> }) {
    const addPopup = usePopupState({ variant: "popover", popupId: "add-location" });

    const cards = locations.map((loc, i) => <LocationCard key={i} location={loc} />);

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
            <SingleInputPopup
                popupProps={addPopup}
                initialValue=""
                label="Name"
                method="post"
                action="new"
            />
        </>
    );
}

function LocationCard({ location }: Props) {
    const { state: chState, dispatch: chDispatch } = useCHState();
    const navigate = useNavigate();
    const params = useParams();
    const matchedLocationId = params ? Number(params["location_id"]) : null;

    const renamePopup = usePopupState({ variant: "popover", popupId: "rename-location" });
    const deletePopup = usePopupState({ variant: "popover", popupId: "delete-location" });

    const isSelected = matchedLocationId === location.id;

    const onClick = () => {
        chDispatch({ type: "Select", level: Level.Location, id: location.id, navFn: navigate });
    };

    return (
        <>
            <Grid item xs={6} sm={6} md={12}>
                <Card
                    sx={{
                        // Enough height to fit the button column - my first attempt was setting the
                        // button column width to 0, but that caused weird artifacts on the border
                        // (probably some pixels of the icon buttons were shown somewhy)
                        height: "120px",
                        flexShrink: 0,
                        display: "flex",
                        border: "1px solid",
                        borderColor: isSelected ? "primary.main" : "divider",
                    }}
                >
                    <CardActionArea
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            p: 1,
                            width: 0,
                            flexGrow: 1,
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
                                        <Typography
                                            color="text.secondary"
                                            sx={{ fontSize: "1.2em" }}
                                        >
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
                            <IconButton color="info">
                                <PowerOffIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={renamePopup.open}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={deletePopup.open}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Card>
            </Grid>
            <SingleInputPopup
                popupProps={renamePopup}
                label="Name"
                initialValue={location.name}
                method="post"
                action="edit"
            >
                <input readOnly hidden name="id" value={location.id} />
            </SingleInputPopup>
            <ConfirmPopup
                popupProps={deletePopup}
                text={
                    <>
                        Deleting Location <i>{location.name}</i>
                    </>
                }
                method="post"
                action="delete"
            >
                <input readOnly hidden name="id" value={location.id} />
            </ConfirmPopup>
        </>
    );
}
