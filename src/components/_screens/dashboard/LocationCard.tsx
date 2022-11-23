import useCHState, { Level } from "companyHierarchyProvider";
import { useNavigate } from "react-router-dom";
import { Location } from "types";

import { Box, Card, CardActionArea } from "@mui/material";

type Props = {
    location: Location;
};

export default function LocationCard({ location }: Props) {
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
        <Card
            square
            elevation={0}
            sx={{
                backgroundColor: isSelected ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.05)",
                flexShrink: 0,
                display: "flex",
            }}
        >
            <CardActionArea sx={{ p: 1 }} onClick={onClick}>
                {location.name}
            </CardActionArea>
            <Box></Box>
        </Card>
    );
}
