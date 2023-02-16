import Title from "components/Title";
import * as React from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Card, MenuItem, Select, SelectChangeEvent } from "@mui/material";
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

export default function UserManager() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("username"),
            password: data.get("passord"),
        });
    };

    const [newRole, setNewRole] = React.useState("Role");
    const handleRoleChange = (event: SelectChangeEvent<string>) => {
        setNewRole(event.target.value);
        console.log(newRole);
    };

    return (
        <Grid
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            sx={{ height: "100%" }}
        >
            <Card sx={{ width: "45%", height: "99%", mt: 1 }}>
                <Grid display="flex" justifyContent="center" sx={{ mt: 2 }}>
                    <Title>Users</Title>
                </Grid>
                <Grid></Grid>
            </Card>
            <Card sx={{ width: "45%", height: "99%", mt: 1 }}>
                <Grid display="flex" flexDirection="column" alignItems="center">
                    <Grid display="flex" justifyContent="center" sx={{ mt: 2 }}>
                        <Title>Create New</Title>
                    </Grid>
                    <Grid
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        component="form"
                        onSubmit={handleSubmit}
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
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Select id="role" label="Role" value={newRole} onChange={handleRoleChange}>
                            <MenuItem value={"admin"}>Admin</MenuItem>
                            <MenuItem value={"operator"}>Operator</MenuItem>
                            <MenuItem value={"engineer"}>Engineer</MenuItem>
                        </Select>
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
        </Grid>
    );
}
