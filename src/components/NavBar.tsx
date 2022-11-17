import { useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function NavBar() {
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {};

    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton color="inherit" onClick={toggleDrawer}>
                        {drawerOpen ? (
                            <ClearIcon fontSize="large" />
                        ) : (
                            <MenuIcon fontSize="large" />
                        )}
                    </IconButton>
                    <Typography component="div" variant="h6" sx={{ pl: 2 }}>
                        Production Line Monitoring
                    </Typography>
                </Toolbar>
            </AppBar>
            <Offset />
        </>
    );
}
