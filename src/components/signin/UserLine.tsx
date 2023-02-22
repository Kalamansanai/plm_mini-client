import { useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import {
    Box,
    Card,
    CardActionArea,
    Divider,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";

import { _User } from "./UserManager";

export default function UserLineGrid({
    users,
    selected,
    setSelected,
}: {
    users: Array<_User>;
    selected: _User | null;
    setSelected: React.Dispatch<React.SetStateAction<_User | null>>;
}) {
    return (
        <>
            <Card>
                {users
                    ? users.map((user) => (
                          <UserCard user={user} selected={selected} setSelected={setSelected} />
                      ))
                    : null}
                <Divider
                    flexItem
                    orientation="horizontal"
                    variant="middle"
                    sx={{ bgcolor: "black", mx: 1 }}
                />
                <Grid xs={6} sm={6} md={12}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            height: "120px",
                            borderRadius: "4px",
                            borderColor: "divider",
                            flexGrow: 1,
                        }}
                    >
                        <Tooltip title="New User">
                            <IconButton onClick={(e) => setSelected(null)}>
                                <AddIcon sx={{ fontSize: 40, color: "primary.main" }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Grid>
            </Card>
        </>
    );
}

type Props = {
    user: _User;
    selected: _User | null;
    setSelected: React.Dispatch<React.SetStateAction<_User | null>>;
};

function UserCard({ user, selected, setSelected }: Props) {
    const onClick = () => {
        setSelected(user);
    };

    return (
        <CardActionArea
            onClick={onClick}
            sx={{ bgcolor: selected?.id === user.id ? "primary.light" : "default" }}
        >
            <Divider
                flexItem
                orientation="horizontal"
                variant="middle"
                sx={{ bgcolor: "black", mx: 1 }}
            />
            <Grid
                display="flex"
                justifyContent="space-between"
                sx={{
                    marginTop: 4,
                    marginBottom: 4,
                    marginRight: 2,
                }}
            >
                <Box display="flex" flexDirection="row">
                    <AccountCircleIcon fontSize="large" sx={{ ml: 2, color: "primary.dark" }} />
                    <Typography variant="h5" sx={{ color: "primary.dark" }}>
                        {user.name}
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row">
                    <Typography variant="h6">Authority level:</Typography>
                    <Typography variant="h6" sx={{ color: "primary.dark" }}>
                        {user.role}
                    </Typography>
                </Box>
            </Grid>
        </CardActionArea>
    );
}
