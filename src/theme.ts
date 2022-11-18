import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import type {} from "@mui/x-data-grid/themeAugmentation";

declare module "@mui/material/styles" {
    interface Theme {
        drawerWidth: number;
        borderRadius: number;
    }

    interface ThemeOptions {
        drawerWidth?: number;
        borderRadius?: number;
    }
}

const theme = createTheme({
    drawerWidth: 240,
    borderRadius: 8,
    palette: {
        primary: {
            main: "#00457E",
        },
        background: {
            default: "#eaeaea",
            paper: "#f0f0f0",
        },
        text: {
            primary: grey[800],
            secondary: grey[600],
            disabled: grey[400],
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
