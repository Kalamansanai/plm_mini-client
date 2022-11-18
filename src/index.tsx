import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter,
    isRouteErrorResponse,
    Navigate,
    Route,
    RouterProvider,
    Routes,
    useRouteError,
} from "react-router-dom";

import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";

import App from "./App";
import { CompanyHierarchyProvider } from "./companyHierarchyProvider";
import CompanyHierarchy from "./components/_screens/company_hierarchy/CompanyHierarchy";
import Dashboard from "./components/_screens/dashboard/Dashboard";
import theme from "./theme";

function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    if (isRouteErrorResponse(error)) {
        return (
            <Box>
                <Typography>An unexpected error has occurred.</Typography>
                <Typography>{error.statusText || error.data?.message}</Typography>
            </Box>
        );
    } else {
        return <Typography>An unknown error has occurred.</Typography>;
    }
}

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <CompanyHierarchyProvider>
                    <CssBaseline />
                    <BrowserRouter>
                        <Routes>
                            <Route path="*" element={<Navigate to="/" replace />} />
                            <Route path="/" element={<App />} errorElement={<ErrorPage />}>
                                <Route index element={<CompanyHierarchy />} />
                                <Route path="dashboard/:id" element={<Dashboard />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </CompanyHierarchyProvider>
            </SnackbarProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
