import { useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, SwipeableDrawer, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function NavBar() {
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentRouteIndex, setCurrentRouteIndex] = useState(0);

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
            <SwipeableDrawer
                variant="temporary"
                open={drawerOpen}
                onOpen={() => setDrawerOpen(true)}
                onClose={() => setDrawerOpen(false)}
                anchor="left"
            >
                <Offset />
                <List
                    sx={{ position: "relative", width: theme.drawerWidth, height: "100%" }}
                ></List>
            </SwipeableDrawer>
        </>
    );
}
