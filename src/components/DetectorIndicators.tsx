import FavoriteIcon from "@mui/icons-material/Favorite";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import QrCodeIcon from "@mui/icons-material/QrCode";
import VideocamIcon from "@mui/icons-material/Videocam";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Chip, ChipTypeMap } from "@mui/material";

import { DetectorState } from "../types";

type StateIndicatorProps = { state: Array<DetectorState> };

const stateIndicatorMap: {
    [state: string]: { icon: React.ReactElement; color: ChipTypeMap["props"]["color"] };
} = {};
stateIndicatorMap[DetectorState.Off] = { icon: <HighlightOffIcon />, color: "default" };
stateIndicatorMap[DetectorState.Standby] = { icon: <ModeStandbyIcon />, color: "primary" };
stateIndicatorMap[DetectorState.Streaming] = { icon: <VideocamIcon />, color: "secondary" };
stateIndicatorMap[DetectorState.Monitoring] = { icon: <VisibilityIcon />, color: "success" };
stateIndicatorMap[DetectorState.Locating] = { icon: <QrCodeIcon />, color: "info" };

// TODO(rg): detector health indicator based on detector heartbeat and possible errors reported by
// the detector or the backend
function HealthIndicator() {
    return (
        <Chip
            icon={<FavoriteIcon />}
            sx={{
                bgcolor: "error.main",
                "& .MuiSvgIcon-root": { color: "white" },
                "& .MuiChip-label": { pl: "0px" },
            }}
        />
    );
}

export function StateIndicator({ state }: StateIndicatorProps) {
    return (
        <Box display="flex" gap={1}>
            {state.find((s) => s !== DetectorState.Off) ? <HealthIndicator /> : null}
            {state.map((s, i) => {
                // All DetectorStates are covered so this should never be undefined
                const { icon, color } = stateIndicatorMap[s]!;

                return (
                    <Chip
                        key={i}
                        label={s}
                        icon={icon}
                        color={color}
                        sx={{ filter: "brightness(150%)" }}
                    />
                );
            })}
        </Box>
    );
}
