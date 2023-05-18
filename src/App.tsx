import { login } from "components/signin/SignIn";
import { useSnackbar } from "notistack";
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "types";

import { Box, useMediaQuery } from "@mui/material";

import "./App.css";
import { setupInterceptors } from "./api";
import NavBar from "./components/NavBar";

export const GlobalContext = createContext<{
    user: User | null;
    setUser: (u: User | null) => void;
}>({
    user: null,
    setUser: () => {},
});

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const isOverflowHidden = useMediaQuery("(min-width: 1900px) and (max-width: 1921px)");

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!user) {
            login()
                .then((res) => {
                    if (res) setUser(res);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [user]);

    useEffect(() => {
        setupInterceptors({
            onBadRequest: (res) => {
                if (res.errors) {
                    const element = (
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            {res.errors.map((err, i) => (
                                <span key={i}>{err}</span>
                            ))}
                        </Box>
                    );
                    enqueueSnackbar(element, { variant: "error", preventDuplicate: true });
                } else {
                    enqueueSnackbar(res.description, { variant: "error", preventDuplicate: true });
                }
            },
            onUnauthorized: () => {},
            onForbidden: () => {},
            onServerError: (res) => {
                enqueueSnackbar(res.description, { variant: "error", preventDuplicate: true });
            },
        });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    overflow: isOverflowHidden ? "hidden" : "auto",
                }}
            >
                <NavBar />
                <Box sx={{ flexGrow: 1 }}>
                    <Outlet />
                </Box>
            </Box>
        </GlobalContext.Provider>
    );
}
