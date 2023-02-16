import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import React  from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Detector, Location } from "types";
import VideocamIcon from "@mui/icons-material/Videocam";
import { StateIndicator as DetectorStateIndicator } from "components/DetectorIndicators";



type Props = {
    detector: Detector;
    location: Location;
}

export default function DetectorCard({ detector, location }: Props){
    const navigate = useNavigate();
    const params = useParams();
    const matchedDetectorId = params ? Number(params["detector_id"]) : null;
    const isSelected = matchedDetectorId === detector.id;

    const onClick = () => {
        navigate("detector/" + detector.id.toString());
    }


    return (
            <Grid item xs={6} sm={6} md={12}>
                <Card
                    sx={{
                        // Enough height to fit the button column - my first attempt was setting the
                        // button column width to 0, but that caused weird artifacts on the border
                        // (probably some pixels of the icon buttons were shown somewhy)
                        height: "160px",
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
                        <Typography variant="h5">{detector.name}</Typography>
                        <Typography>{detector.macAddress.toString().match( /.{1,2}/g )!.join( ':' )} </Typography>
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
                                    {location.name}
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex" gap={1}>
                            <DetectorStateIndicator state={detector.state} />
                        </Box>
                    </CardActionArea>
                </Card>
            </Grid>
    )
}