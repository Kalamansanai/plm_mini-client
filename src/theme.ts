import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

export const drawerWidth = 240;
export const shape = {
    borderRadius: 8,
};

const theme = createTheme({
    palette: {
        primary: {
            main: "#00457E",
        },
        background: {
            default: "#eaeaea",
            paper: "#f0f0f0",
        },
        text: {
            primary: grey[500],
            secondary: grey[200],
        },
    },
    components: {
        MuiDivider: {
            styleOverrides: {
                root: {
                    "&.MuiDivider-root::before": {
                        position: "static",
                    },
                    "&.MuiDivider-root::after": {
                        position: "static",
                    },
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    "&.MuiDataGrid-root .MuiDataGrid-toolbarContainer": {
                        paddingTop: 0,
                    },
                    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus": {
                        outline: "none",
                    },
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
                        outline: "none",
                    },
                    "& .datagrid-selectable-row": {
                        cursor: "pointer",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    "& .hidden-icon": {
                        display: "none",
                    },
                    "&:hover .hidden-icon": {
                        display: "flex",
                    },
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    "& .hidden-icon": {
                        display: "none",
                    },
                    "&:hover .hidden-icon": {
                        display: "flex",
                    },
                },
            },
        },
    },
});

export default theme;
