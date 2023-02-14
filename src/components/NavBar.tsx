import { GlobalContext } from "App";
import { backend } from "api";
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { User } from "types";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FactoryIcon from "@mui/icons-material/Factory";
import InfoIcon from "@mui/icons-material/Info";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Box, Button, Divider, Link, styled, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function NavBar() {
    const { user } = useContext(GlobalContext);

    const navigate = useNavigate();

    const onProfile = () => {
        navigate({ pathname: "/signin" });
    };

    const onLogo = () => {
        navigate({ pathname: "/hierarchy" });
    };

    const onData = () => {
        navigate({ pathname: "/prev_instances" });
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "primary.dark" }}
            >
                <Toolbar>
                    <Button sx={{ color: "white", fontSize: "1.2em" }}>
                        <Typography component="div" variant="h5" onClick={onLogo}>
                            Production Line Monitoring
                        </Typography>
                    </Button>
                    <Box display="flex" gap={2} sx={{ ml: "auto" }}>
                        <Button
                            onClick={onProfile}
                            size="large"
                            sx={{ color: "white", fontSize: "1.2em" }}
                        >
                            <Box flexDirection="column">
                                <Box>{user ? <div>{user.name}</div> : null}</Box>
                                {user ? (
                                    <Box mt="0" mb="0" color="red" fontSize="small">
                                        {user.role}
                                    </Box>
                                ) : null}
                            </Box>
                            <AccountCircleIcon fontSize="large" sx={{ ml: 2 }} />
                        </Button>
                        <Divider
                            flexItem
                            orientation="vertical"
                            variant="middle"
                            sx={{ bgcolor: "white", mx: 1 }}
                        />
                        <Tooltip title="Organization">
                            <IconButton sx={{ color: "white" }}>
                                <FactoryIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Dashboard">
                            <IconButton sx={{ color: "white" }}>
                                <DashboardIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Data">
                            <IconButton onClick={onData} sx={{ color: "white" }}>
                                <ListAltIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="About">
                            <IconButton sx={{ color: "white" }}>
                                <InfoIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
            <Offset />
        </>
    );
}
