import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import QrCodeIcon from "@mui/icons-material/QrCode";
import VideocamIcon from "@mui/icons-material/Videocam";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Chip } from "@mui/material";

import { DetectorState } from "../types";

type StateIndicatorProps = { state: DetectorState };

const stateIndicatorIcons: { [state: string]: React.ReactElement } = {};
stateIndicatorIcons[DetectorState.Off] = <HighlightOffIcon />;
stateIndicatorIcons[DetectorState.Standby] = <ModeStandbyIcon />;
stateIndicatorIcons[DetectorState.Streaming] = <VideocamIcon />;
stateIndicatorIcons[DetectorState.Monitoring] = <VisibilityIcon />;
stateIndicatorIcons[DetectorState.Locating] = <QrCodeIcon />;

const splitDetectorStates = (states: DetectorState): Array<DetectorState> => {
    // TODO(rg): types are messed up. DetectorState is a bitfield on the API, and it sends the
    // items in a comma-separated string. Our API client however gets a single DetectorState...
    return states.split(",").map((s) => s.trim());
};

export function StateIndicator({ state }: StateIndicatorProps) {
    const individualStates = splitDetectorStates(state);

    return (
        <Box display="flex" gap={1}>
            {individualStates.map((s, i) => (
                <Chip key={i} label={s} />
            ))}
        </Box>
    );
}

export function HealthIndicator() {}
