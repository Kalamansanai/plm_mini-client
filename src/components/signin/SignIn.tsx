import { GlobalContext } from "App";
import { backend, config as apiConfig } from "api";
import InvalidPasswordPopup from "components/popups/InvalidPasswordPopup";
import CryptoJS from "crypto-js";
import { usePopupState } from "material-ui-popup-state/hooks";
import * as React from "react";
import { User } from "types";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import UserManager from "./UserManager";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {"BME AUT - Knorr Bremse"}
        </Typography>
    );
}

export const hash = (string: string) => {
    return CryptoJS.SHA256(string).toString();
};

const theme = createTheme();

type Params = {
    name: string;
    pass: string;
    setUser: (u: User | null) => void;
    setInvalidPassword: React.Dispatch<React.SetStateAction<boolean>>;
};
async function SignInReq({ name, pass, setUser, setInvalidPassword }: Params) {
    console.log(name);
    console.log(pass);
    const password = hash(pass);
    console.log(password);
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
        temp;
        setUser(temp);
        setInvalidPassword(false);
    } else {
        setInvalidPassword(true);
        setUser(null);
    }
}

export const login = async () => {
    const response = await fetch(`${backend}/api/v1/user`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    if (response.status != 400) {
        const temp = await response.json();
        return temp;
    } else {
        return null;
    }
};

export const logout = async (setUser: (u: User | null) => void) => {
    const response = await fetch(`${backend}/api/v1/user/signout`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    if (response.status != 400) {
        const temp = await response.json();
        setUser(null);
        return temp;
    } else {
        return null;
    }
};

export default function SignIn() {
    const { user, setUser } = React.useContext(GlobalContext);

    // const [user, setUser] = React.useState(temp);
    const [invalidPassword, setInvalidPassword] = React.useState(false);

    const invalidPasswordPopup = usePopupState({ variant: "popover", popupId: "invalidPassword" });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = data.get("username");
        const psw = data.get("password")?.toString();

        SignInReq({
            //@ts-ignore
            name: name,
            //@ts-ignore
            pass: psw,
            setUser: setUser,
            setInvalidPassword: setInvalidPassword,
        });

        //@ts-ignore
        // setUser(user);
    };

    const handleLogOut = () => {
        logout(setUser);
    };

    console.log(user);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
            }}
        >
            {!user ? (
                <Box
                    maxWidth="xs"
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
            ) : null}
            {user ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            variant="outlined"
                            sx={{ marginTop: 3, marginRight: 4, marginBottom: 1 }}
                            onClick={handleLogOut}
                        >
                            Log out
                        </Button>
                    </Box>
                </Box>
            ) : null}
            {user?.role === "SuperUser" ? <UserManager /> : null}

            {invalidPassword ? <InvalidPasswordPopup popupProps={invalidPasswordPopup} /> : null}
        </Box>
    );
}
export { Copyright };
