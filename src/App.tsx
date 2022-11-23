import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

import "./App.css";
import { setupInterceptors } from "./api";
import NavBar from "./components/NavBar";

const breakpoint = "md";

export default function App() {
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();

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
            onNotFound: () => {},
            onUnauthorized: () => {},
            onForbidden: () => {},
            onServerError: (res) => {
                enqueueSnackbar(res.description, { variant: "error", preventDuplicate: true });
            },
            onUnknownError: (url: string, status: number, statusText: string, body: string) => {
                const formattedError = `${status} (${statusText}) while accessing '${url}'; ${body}`;
                console.error(formattedError);
                enqueueSnackbar(formattedError, { variant: "error", preventDuplicate: true });
            },
        });
    }, []);

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <NavBar />
            <Box sx={{ m: 2, flexGrow: 1 }}>
                <Outlet />
            </Box>
        </Box>
    );
}
