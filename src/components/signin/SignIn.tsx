import { backend, config as apiConfig } from "api";
import { UsersApi, ApiEndpointsUsersSignInRequest } from "api_client/apis/UsersApi";
import InvalidPasswordPopup from "components/popups/InvalidPasswordPopup";
import { usePopupState } from "material-ui-popup-state/hooks";
import * as React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { User } from "types";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {"BME AUT - Knorr Bremse"}
        </Typography>
    );
}

const theme = createTheme();

type Params = {
    name: string;
    password: string;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    setInvalidPassword: React.Dispatch<React.SetStateAction<boolean>>;
};
async function SignInReq({ name, password, setUser, setInvalidPassword }: Params) {
    const response = await fetch(`${backend}/api/v1/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            name,
            password,
        }),
    });

    const content = await response.json();

    const userResponse = await fetch(`${backend}/api/v1/user`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    if (userResponse.status != 400) {
        const temp = await userResponse.json();
        console.log(temp);
        setUser(temp);
        setInvalidPassword(false);
    } else {
        setInvalidPassword(true);
        setUser({ name: "", role: "" });
    }
}

export async function loader() {
    const userResponse = await fetch(`${backend}/api/v1/user`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    if (userResponse.status != 400) {
        const temp = await userResponse.json();
        console.log(temp);
        return temp;
    } else {
        return { name: "", role: "" };
    }
}

export default function SignIn() {
    const temp = useLoaderData() as User;

    const [user, setUser] = React.useState(temp);
    const [invalidPassword, setInvalidPassword] = React.useState(false);

    const invalidPasswordPopup = usePopupState({ variant: "popover", popupId: "invalidPassword" });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = data.get("username");
        const psw = data.get("password");

        const user = SignInReq({
            //@ts-ignore
            name: name,
            //@ts-ignore
            password: psw,
            setUser: setUser,
            setInvalidPassword: setInvalidPassword,
        });

        //@ts-ignore
        // setUser(user);
    };

    console.log(user);
    return (
        <>
            {user.name === "" ? (
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={(e) => invalidPasswordPopup.open(e)}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </Box>
                        <Copyright sx={{ mt: 8, mb: 4 }} />
                    </Container>
                </ThemeProvider>
            ) : null}
            {user.name !== "" ? (
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        // height: "100%",
                    }}
                >
                    <Card
                        sx={{
                            marginTop: 3,
                            backgroundColor: "white",
                            // height: "20%",
                            // width: "40%",
                            // border: "1px solid",
                            borderRadius: "20px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <AccountCircleIcon fontSize="large" sx={{ ml: 2 }} />
                            <Typography component="h1" variant="h5">
                                {user.name}
                            </Typography>
                        </Box>
                        <Typography component="h1" variant="h5">
                            Jogosultságkör: {user.role}
                        </Typography>
                    </Card>
                </Container>
            ) : // <>
            //     <Box>{user.name}</Box>
            //     <Box>{user.role}</Box>
            // </>
            null}
            {invalidPassword ? <InvalidPasswordPopup popupProps={invalidPasswordPopup} /> : null}
        </>
    );
}
export {Copyright};