import { DetailedError } from "api";
import deleteLocationAction from "components/_screens/dashboard/deleteLocation";
import editLocationAction from "components/_screens/dashboard/editLocation";
import newLocationAction from "components/_screens/dashboard/newLocation";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
    useRouteError,
} from "react-router-dom";

import ErrorIcon from "@mui/icons-material/Error";
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
import Dashboard, {
    loader as dashboardLocationLoader,
} from "./components/_screens/dashboard/Dashboard";
import locationTasksLoader from "./components/_screens/dashboard/getLocationTasks";
import DashboardContainer, {
    loader as dashboardLoader,
    DashboardNoStation,
} from "./components/_screens/dashboard/index";
import theme from "./theme";

// TODO(rg): better error handling

// The current request pipeline looks like this:
//  1. generated API client method is called (assuming the call is valid, i.e. parameters are valid)
//  2. middleware.pre are called
//  3. fetch is called
//  4. if fetch threw errors, they are caught and middleware.onError are called; if none of them
//  constructed a valid response then a FetchError is thrown
//  5. middleware.post are called and the final response is returned
//  6. if the response isn't a success, a ResponseError is thrown

// The API returns a detailed error response body on 400 errors, containing a list of reasons why
// the request failed (there can be multiple, e.g. validation errors on multiple fields...). Such a
// response is also sent on 500, even though they don't contain any useful information (TODO: get
// rid of fancy 500 errors on the backend)
function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    let content = null;
    let details = null;

    if (error instanceof DetailedError) {
        content = error.help;
        if (error.innerError) {
            const response = error.innerError.response;
            details = (
                <Typography
                    textAlign="inherit"
                    fontSize="1em"
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        mb: 4,
                        fontFamily: "monospace",
                        color: "rgba(0, 0, 0, 0.2)",
                    }}
                >
                    {response.status} {response.statusText}
                </Typography>
            );
        }
    } else {
        content = <Typography fontSize="1em">An unknown error has occurred.</Typography>;
    }

    return (
        <Box
            id="x"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            fontSize="1.8em"
            height="100%"
        >
            <Box fontSize="8em" sx={{ lineHeight: 0, color: "rgba(0, 0, 0, 0.3)" }}>
                <ErrorIcon fontSize="inherit" />
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ textAlign: "center" }}
            >
                {content}
            </Box>
            {details}
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
                <Route path="dashboard" element={<DashboardNoStation />} />
                <Route
                    id="dashboard-container"
                    loader={dashboardLoader}
                    path="dashboard/:station_id"
                    element={<DashboardContainer />}
                    errorElement={<ErrorPage />}
                >
                    <Route path="new" action={newLocationAction} />
                    <Route path="edit" action={editLocationAction} />
                    <Route path="delete" action={deleteLocationAction} />
                    <Route
                        errorElement={<ErrorPage />}
                        loader={dashboardLocationLoader}
                        path=":location_id"
                        element={<Dashboard />}
                    >
                        <Route path="tasks" loader={locationTasksLoader} />
                    </Route>
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
