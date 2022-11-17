import { default as chStateReducer, initialState as chInitialState } from "companyHierarchy";
import { useSnackbar } from "notistack";
import { useEffect, useReducer } from "react";

import { Box } from "@mui/material";

import "./App.css";
import { setupInterceptors } from "./api";
import NavBar from "./components/NavBar";
import CompanyHierarchy from "./components/_screens/company_hierarchy/CompanyHierarchy";

export default function App() {
    const { enqueueSnackbar } = useSnackbar();
    const [chState, dispatchChState] = useReducer(chStateReducer, chInitialState);

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
        <>
            <NavBar />
            <CompanyHierarchy state={chState} dispatch={dispatchChState} />
        </>
    );
}
