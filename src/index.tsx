import { DetailedError, HelpfulError } from "api";
import CompanyHierarchyNode from "components/_screens/company_hierarchy/CompanyHierarchyNode";
import deleteLocationAction from "components/_screens/dashboard/deleteLocation";
import editLocationAction from "components/_screens/dashboard/editLocation";
import newLocationAction from "components/_screens/dashboard/newLocation";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter,
    createBrowserRouter,
    createRoutesFromElements,
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
import CompanyHierarchy, {
    loader as chLoader,
} from "./components/_screens/company_hierarchy/CompanyHierarchy";
import deleteCHNodeAction from "./components/_screens/company_hierarchy/delete";
import editCHNodeAction from "./components/_screens/company_hierarchy/edit";
import newCHNodeAction from "./components/_screens/company_hierarchy/new";
import Dashboard, { loader as dashboardLoader } from "./components/_screens/dashboard/Dashboard";
import DashboardMain from "./components/_screens/dashboard/DashboardMain";
import StationMenu from "./components/_screens/dashboard/StationMenu";
import theme from "./theme";

function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    let content = null;

    if (error instanceof DetailedError) {
        content = error.help;
    } else {
        content = <Typography fontSize="1.2em">An unknown error has occurred.</Typography>;
    }

    return (
        <Box
            sx={{ height: "100vh", width: "100vw", bgcolor: "white" }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            {content}
        </Box>
    );
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="*" element={<Navigate to="/hierarchy" replace />} />
            <Route element={<App />} errorElement={<ErrorPage />}>
                <Route path="/hierarchy" loader={chLoader} element={<CompanyHierarchy />}>
                    <Route path="new" action={newCHNodeAction} />
                    <Route path="edit" action={editCHNodeAction} />
                    <Route path="delete" action={deleteCHNodeAction} />
                </Route>
                <Route
                    loader={dashboardLoader}
                    path="dashboard/:station_id"
                    element={<Dashboard />}
                    errorElement={<ErrorPage />}
                >
                    <Route path="new" action={newLocationAction} />
                    <Route path="edit" action={editLocationAction} />
                    <Route path="delete" action={deleteLocationAction} />
                    <Route path=":location_id" element={<DashboardMain />} />
                </Route>
            </Route>
        </>
    )
);

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <CompanyHierarchyProvider>
                    <CssBaseline />
                    <RouterProvider router={router} />
                </CompanyHierarchyProvider>
            </SnackbarProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
