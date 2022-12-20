import useCHState, { Level } from "companyHierarchyProvider";
import { bindPopover, usePopupState } from "material-ui-popup-state/hooks";
import { useState } from "react";
import { useFetcher } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { Box } from "@mui/material";
import { IconButton, ListItem, Popover, TextField, Tooltip } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import { default as CHNode } from "./CompanyHierarchyNode";

type Props = {
    level: Level;
    label: string;
    labelSingular: string;
};

export default function CompanyHierarchyLevel({ level, label, labelSingular }: Props) {
    const { state, dispatch } = useCHState();
    const ownSelectedId = state.selectedIds[level];
    const fetcher = useFetcher();

    const [newItemName, setNewItemName] = useState("");

    const addPopup = usePopupState({ variant: "popover", popupId: "add-item" });

    const onNewItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemName(e.target.value);
    };

    const onNewItemKeyboardSubmit = (e: React.KeyboardEvent) => {
        if (e.key !== "Enter") return;
        if (!newItemName) return;

        onNewItemSubmit();
    };

    const onNewItemMouseSubmit = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!newItemName) return;

        onNewItemSubmit();
    };

    const onNewItemSubmit = async () => {
        addPopup.close();
    };

    const addPopupElement = (
        <Popover {...bindPopover(addPopup)} anchorReference="anchorPosition">
            <fetcher.Form method="post" action="new">
                <TextField
                    name="name"
                    label="Name"
                    variant="filled"
                    autoFocus
                    onChange={onNewItemNameChange}
                    onKeyUp={onNewItemKeyboardSubmit}
                    onClick={(e) => e.stopPropagation()}
                />
                <input readOnly hidden name="level" value={level} />
                <input
                    readOnly
                    hidden
                    name="parentId"
                    value={state.selectedIds[level - 1] ?? undefined}
                />
                <IconButton
                    type="submit"
                    sx={{ color: "success.light" }}
                    disabled={!newItemName}
                    onClick={onNewItemMouseSubmit}
                >
                    <CheckIcon />
                </IconButton>
            </fetcher.Form>
        </Popover>
    );

    return (
        <>
            <Grid
                item
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    flex: 1,
                }}
            >
                <Typography sx={{ display: "flex", justifyContent: "center" }} variant="button">
                    {label}
                </Typography>
                <Divider />
                <Box sx={{ display: "flex", flexGrow: 1, height: 0 }}>
                    {level !== 0 && <Divider orientation="vertical" />}
                    <List
                        sx={{ height: "100%", overflowY: "auto", flex: 1 }}
                        hidden={level > state.highestShownLevel}
                    >
                        {state.nodes[level]!.map((node, i) => (
                            <CHNode
                                key={i}
                                node={node}
                                labelSingular={labelSingular}
                                selected={node.id === ownSelectedId}
                                level={level}
                            />
                        ))}
                        <ListItem disablePadding sx={{ pt: 1 }}>
                            <Tooltip title={`Add ${labelSingular}`}>
                                <IconButton
                                    sx={{ color: "primary.main", mx: "auto" }}
                                    onClick={(e: React.MouseEvent) => {
                                        addPopup.open(e);
                                    }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItem>
                    </List>
                </Box>
            </Grid>
            {addPopupElement}
        </>
    );
}
