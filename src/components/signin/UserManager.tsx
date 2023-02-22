import { backend } from "api";
import Title from "components/Title";
import ConfirmPopup from "components/popups/ConfirmPopup";
import { bindPopover, PopupState, usePopupState } from "material-ui-popup-state/hooks";
import * as React from "react";
import { useState } from "react";
import { useFetcher } from "react-router-dom";
import { User } from "types";
import { parseArgs } from "util";

import DeleteIcon from "@mui/icons-material/Delete";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Card, Divider, MenuItem, Popover, Select, SelectChangeEvent } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { height } from "@mui/system";

import { hash } from "./SignIn";
import UserLine from "./UserLine";
import UserLineGrid from "./UserLine";

export type _User = {
    id: number;
    name: string;
    role: string;
};

const listUsers = async (setUsers: React.Dispatch<React.SetStateAction<Array<_User> | null>>) => {
    const response = await fetch(`${backend}/api/v1/user/list`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    if (response.status != 400) {
        const temp = await response.json();
        setUsers(temp);
    } else {
        setUsers(null);
    }
};

const registrateUser = async (
    username: string,
    password: string,
    role: string,
    setSelected: React.Dispatch<React.SetStateAction<_User | null>>
) => {
    console.log(username, password);
    const response = await fetch(`${backend}/api/v1/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            Name: username,
            Password: password,
            Role: role,
        }),
    });

    //need to set better (not only 400 can be an error)
    if (response.status != 400) {
        const id = await response.json().then((res) => {
            return res.Id as number;
        });
        const new_user = { id: id, name: username, role: role };
        setSelected(new_user);
    } else {
        setSelected(null);
    }
};

const deleteUser = async (
    id: number,
    setSelected: React.Dispatch<React.SetStateAction<_User | null>>
) => {
    const response = await fetch(`${backend}/api/v1/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "text/plain" },
        credentials: "include",
    });

    //need to set better (not only 400 can be an error)
    if (response.status != 400) {
        setSelected(null);
    }
};

const updateUser = async (
    id: number,
    setSelected: React.Dispatch<React.SetStateAction<_User | null>>,
    newUsername: string | undefined,
    newPassword: string | undefined,
    newRole: string | undefined
) => {
    const response = await fetch(`${backend}/api/v1/users/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            NewName: newUsername,
            NewPassword: newPassword,
            NewRole: newRole,
        }),
    });

    //need to set better (not only 400 can be an error)
    if (response.status != 400) {
        const temp = await response.json();
        setSelected(temp);
    } else {
        setSelected(null);
    }
};

export default function UserManager() {
    const [users, setUsers] = useState<Array<_User> | null>(null);
    const [selected, setSelected] = useState<_User | null>(null);

    const archivePopup = usePopupState({ variant: "popover", popupId: "archive-user" });

    React.useEffect(() => {
        listUsers(setUsers);
    }, [selected]);

    const handleRegistrate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (data.get("password") != data.get("re-password")) {
            alert("The passwords are different!");
            return;
        }

        if (newRole === "-") {
            alert("Role is need to be set to a valid value!");
            return;
        }

        const password = hash(data.get("password")!.toString());
        console.log(data.get("password")!.toString());
        registrateUser(data.get("username")!.toString(), password, newRole, setSelected);
    };

    const handleDelete = () => {
        //it always be selected, bc the delete button only shows up if the user select one
        deleteUser(selected!.id, setSelected);
    };

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = data.get("new_username")?.toString();
        var password = data.get("new_password")?.toString();
        const repassword = data.get("new_re-password")?.toString();
        const role = data.get("new_role")?.toString();

        if (password != repassword) {
            alert("The passwords are different!");
            return;
        }

        password = password === undefined ? undefined : hash(password);
        //it always be selected, bc the delete button only shows up if the user select one
        updateUser(selected!.id, setSelected, name, password, role);
    };

    const [newRole, setNewRole] = React.useState<string>("-");
    const handleRoleChange = (event: SelectChangeEvent<string>) => {
        setNewRole(event.target.value);
    };

    return (
        <Grid
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            sx={{ height: "100%" }}
        >
            <Card sx={{ width: "45%", height: "99%", mt: 1, boxShadow: 3, borderRadius: 4 }}>
                <Grid display="flex" justifyContent="center" sx={{ mt: 2 }}>
                    <Title>Users</Title>
                </Grid>
                <Grid
                    sx={{
                        marginTop: 4,
                        marginBottom: 4,
                        overflowY: "auto",
                        height: "400px",
                    }}
                >
                    {users ? (
                        <UserLineGrid users={users} selected={selected} setSelected={setSelected} />
                    ) : null}
                </Grid>
            </Card>

            {selected ? (
                <Card sx={{ width: "45%", height: "99%", mt: 1, boxShadow: 3, borderRadius: 4 }}>
                    <Grid display="flex" flexDirection="column">
                        <Grid display="flex" justifyContent="center" sx={{ mt: 2 }}>
                            <Title>User Modification</Title>
                        </Grid>

                        <Grid display="flex" flexDirection="column" alignItems="center">
                            <Grid
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                component="form"
                                onSubmit={handleUpdate}
                                noValidate
                                sx={{ mt: 1, width: "80%" }}
                            >
                                <Grid
                                    display="flex"
                                    flexDirection="row"
                                    // justifyContent="flex-start"
                                    sx={{ width: "100%", mt: 2 }}
                                >
                                    <Typography>User Data:</Typography>
                                    <Grid display="flex" flexDirection="column" sx={{ ml: 2 }}>
                                        <Typography>User Name:</Typography>
                                        <Typography>User Role:</Typography>
                                    </Grid>
                                    <Grid display="flex" flexDirection="column" sx={{ ml: 2 }}>
                                        <Typography sx={{ textDecoration: "underline" }}>
                                            {selected.name}
                                        </Typography>
                                        <Typography sx={{ textDecoration: "underline" }}>
                                            {selected.role}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="new_username"
                                    label="New Username"
                                    name="new_username"
                                    autoComplete="new_username"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="new_password"
                                    label="New Password"
                                    type="password"
                                    id="new_password"
                                    autoComplete="current-password"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="new_re-password"
                                    label="New Password Again"
                                    type="password"
                                    id="new_re-password"
                                    autoComplete="current-password"
                                />
                                <Grid
                                    display="flex"
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ width: "100%" }}
                                >
                                    <Typography>New Role:</Typography>
                                    <Select
                                        id="new_role"
                                        name="new_role"
                                        label="Role"
                                        value={newRole}
                                        onChange={handleRoleChange}
                                        sx={{ width: "50%" }}
                                    >
                                        <MenuItem value={"-"}>-</MenuItem>
                                        <MenuItem value={"SuperUser"}>SuperUser</MenuItem>
                                        <MenuItem value={"Operator"}>Operator</MenuItem>
                                        <MenuItem value={"Engineer"}>Engineer</MenuItem>
                                    </Select>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, width: "50%" }}
                                >
                                    Save Changes
                                </Button>
                                <Button
                                    // type="submit"
                                    onClick={archivePopup.open}
                                    fullWidth
                                    variant="outlined"
                                    sx={{ mb: 1, width: "50%", color: "red" }}
                                    startIcon={<DeleteIcon />}
                                >
                                    Archive User
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            ) : null}

            {!selected ? (
                <Card sx={{ width: "45%", height: "99%", mt: 1, boxShadow: 3, borderRadius: 4 }}>
                    <Grid display="flex" flexDirection="column" alignItems="center">
                        <Grid display="flex" justifyContent="center" sx={{ mt: 2 }}>
                            <Title>Create New</Title>
                        </Grid>
                        <Grid
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            component="form"
                            onSubmit={handleRegistrate}
                            noValidate
                            sx={{ mt: 1, width: "80%" }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="re-password"
                                label="re-Password"
                                type="password"
                                id="re-password"
                                autoComplete="current-password"
                            />
                            <Grid
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ width: "100%" }}
                            >
                                <Typography>New Role:</Typography>
                                <Select
                                    id="role"
                                    label="Role"
                                    value={newRole}
                                    onChange={handleRoleChange}
                                    sx={{ width: "50%" }}
                                >
                                    <MenuItem value={"-"}>-</MenuItem>
                                    <MenuItem value={"SuperUser"}>SuperUser</MenuItem>
                                    <MenuItem value={"Operator"}>Operator</MenuItem>
                                    <MenuItem value={"Engineer"}>Engineer</MenuItem>
                                </Select>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: "40%" }}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            ) : null}
            <ConfirmArchive
                popupProps={archivePopup}
                text={<>Deleting User</>}
                func={handleDelete}
            ></ConfirmArchive>
        </Grid>
    );
}

type Props = {
    popupProps: PopupState;
    text: React.ReactNode | string;
    func: () => any;
};

export function ConfirmArchive({ popupProps, text, func }: Props) {
    return (
        <Popover {...bindPopover(popupProps)} anchorReference="anchorPosition">
            <Typography sx={{ m: 2 }}>{text}. Are you sure?</Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Button
                    type="button"
                    variant="text"
                    sx={{ color: "greys.main" }}
                    onClick={popupProps.close}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        popupProps.close();
                        func();
                    }}
                    variant="text"
                    color="error"
                >
                    Ok
                </Button>
            </Box>
        </Popover>
    );
}
