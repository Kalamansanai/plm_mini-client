import About from "About";
import { DetailedError } from "api";
import FileManager from "components/FileManager/FileManager";
import DetectorDetails, {
    loader as detectorDetailsLoader,
} from "components/_screens/dashboard/DetectorDetails";
import deleteLocationAction from "components/_screens/dashboard/deleteLocation";
import editLocationAction from "components/_screens/dashboard/editLocation";
import newLocationAction from "components/_screens/dashboard/newLocation";
import NewTask, {
    loader as newTaskLoader,
    action as newTaskAction,
    newJobAction,
} from "components/_screens/task/NewTask";
import Task, { loader as taskLoader, action as taskAction } from "components/_screens/task/Task";
import SignIn from "components/signin/SignIn";
import UserManager from "components/signin/UserManager";
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
import Dashboard, {
    loader as dashboardLocationLoader,
} from "./components/_screens/dashboard/Dashboard";
import PrevInstances, {
    loader as prevInstancesLocationLoader,
} from "./components/_screens/dashboard/PrevInstances";
import locationTasksLoader from "./components/_screens/dashboard/getLocationTasks";
import DashboardContainer, {
    loader as dashboardLoader,
    DashboardNoStation,
} from "./components/_screens/dashboard/index";
import sendCommandAction from "./components/_screens/dashboard/sendCommand";
import theme from "./theme";

// TODO(rg): better error handling

// The current request pipeline looks like this:
//  1. generated API client method is called (assuming the call is valid, i.e.
//  parameters are valid)
//  2. middleware.pre are called
//  3. fetch is called
//  4. if fetch threw errors, they are caught and middleware.onError are called;
//  if none of them constructed a valid response then a FetchError is thrown
//  5. middleware.post are called and the final response is returned
//  6. if the response isn't a success, a ResponseError is thrown

// The API returns a detailed error response body on 400 errors, containing a
// list of reasons why the request failed (there can be multiple, e.g.
// validation errors on multiple fields...). Such a response is also sent on
// 500, even though they don't contain any useful information (TODO: get rid of
// fancy 500 errors on the backend)
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
        content = <Typography fontSize="1em"> An unknown error has occurred.</Typography>;
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
            <Route path="*" element={<Navigate to="/dashboard/1" replace />} />
            <Route element={<App />} errorElement={<ErrorPage />}>
                <Route path="signin" element={<SignIn />}></Route>

                <Route path="about" element={<About />}></Route>
                <Route path="filemanager" element={<FileManager />}></Route>
                <Route path="dashboard" element={<DashboardNoStation />} />
                <Route path="task">
                    <Route
                        path="new"
                        element={<NewTask />}
                        loader={newTaskLoader}
                        action={newTaskAction}
                    >
                        <Route path="new_job" action={newJobAction} />
                    </Route>
                    <Route
                        path=":task_id"
                        element={<Task />}
                        loader={taskLoader}
                        action={taskAction}
                    />
                </Route>
                <Route
                    id="dashboard-container"
                    loader={dashboardLoader}
                    path="dashboard/:station_id"
                    element={<DashboardContainer />}
                    errorElement={<ErrorPage />}
                >
                    <Route
                        path="prev_instances/:location_id"
                        loader={prevInstancesLocationLoader}
                        element={<PrevInstances />}
                    />
                    <Route path="new" action={newLocationAction} />
                    <Route path="edit" action={editLocationAction} />
                    <Route path="delete" action={deleteLocationAction} />
                    <Route
                        errorElement={<ErrorPage />}
                        loader={dashboardLocationLoader}
                        path="location/:location_id"
                        element={<Dashboard />}
                    >
                        <Route path="tasks" loader={locationTasksLoader} />
                        <Route path="send_command" action={sendCommandAction} />
                    </Route>

                    <Route
                        errorElement={<ErrorPage />}
                        loader={detectorDetailsLoader}
                        path="detector/:detector_id"
                        element={<DetectorDetails />}
                    ></Route>
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
