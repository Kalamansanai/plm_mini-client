import useCHState, { LevelDescriptor, Level } from "companyHierarchyProvider";
import { bindPopover, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { Box } from "@mui/material";
import { IconButton, ListItem, Popover, TextField, Tooltip } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import { default as CHNode } from "./CompanyHierarchyNode";

export default function CompanyHierarchyLevel({
    level,
    label,
    labelSingular,
    addFn,
    getFn,
    renameFn,
    deleteFn,
}: LevelDescriptor) {
    const { state, dispatch } = useCHState();
    const navigate = useNavigate();
    const ownSelectedId = state.selectedIds[level];
    const maxLevel: Level = Level.Station;

    const [newItemName, setNewItemName] = useState("");

    const addPopup = usePopupState({ variant: "popover", popupId: "add-item" });

    // fetch for first level
    useEffect(() => {
        const fetchData = async () => {
            if (level !== 0) return;

            const data = await getFn();
            dispatch({ type: "SetItems", level: level, items: data });
        };

        fetchData();
    }, [level]);

    // fetch for all other levels
    useEffect(() => {
        const fetchData = async () => {
            const previousLevelId = state.selectedIds[level - 1];
            if (previousLevelId === null || previousLevelId === undefined) return;

            const data = await getFn(previousLevelId);
            dispatch({ type: "SetItems", level: level, items: data });
        };

        if (level > state.highestShownLevel) {
            dispatch({ type: "SetItems", level: level, items: [] });
            dispatch({ type: "SetSelectedId", level: level, id: null });
        }

        if (level === state.highestShownLevel) {
            if (state.selectedIds[level - 1] !== null) {
                fetchData();
            }
        }
    }, [level, state.selectedIds[level - 1], state.highestShownLevel]);

    const onNodeClick = (id: number) => {
        dispatch({ type: "SetSelectedId", level: level, id });

        if (level === maxLevel) {
            navigate(`station/${id}`);
        }
    };

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
        let newNode;

        if (level === 0) {
            // We're on the site level - no parentId is needed when adding a node
            const newNodeRes = await addFn(newItemName);
            newNode = { id: newNodeRes.id, name: newNodeRes.name };
        } else {
            // ...otherwise, parent id is needed, as the new node will be the child of the node
            // selected on the previous level
            const previousSelectedId = state.selectedIds[level - 1];
            if (previousSelectedId === null || previousSelectedId === undefined) return;

            const newSiteRes = await addFn(newItemName, previousSelectedId);
            newNode = { id: newSiteRes.id, name: newSiteRes.name };
        }

        dispatch({ type: "AddItem", level: level, item: newNode });
        setNewItemName("");
        addPopup.close();
    };

    const onItemRename = async (id: number, name: string) => {
        await renameFn(id, name);
        dispatch({ type: "RenameItem", level: level, id: id, name: name });
        return true;
    };

    const onItemDelete = async (id: number) => {
        await deleteFn(id);
        dispatch({ type: "DeleteItem", level: level, id: id });
    };

    const addPopupElement = (
        <Popover {...bindPopover(addPopup)} anchorReference="anchorPosition">
            <TextField
                label="Name"
                variant="filled"
                autoFocus
                onChange={onNewItemNameChange}
                onKeyUp={onNewItemKeyboardSubmit}
                onClick={(e) => e.stopPropagation()}
            />
            <IconButton
                sx={{ color: "success.light" }}
                disabled={!newItemName}
                onClick={onNewItemMouseSubmit}
            >
                <CheckIcon />
            </IconButton>
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
                <Box sx={{ display: "flex", flexDirection: "flex-end", flexGrow: 1, height: 0 }}>
                    {level !== 0 && <Divider orientation="vertical" />}
                    <List
                        sx={{ height: "100%", overflowY: "auto", flex: 1 }}
                        hidden={level > state.highestShownLevel}
                    >
                        {state.items[level]!.map((item, i) => (
                            <CHNode
                                key={i}
                                item={item}
                                selected={item.id === ownSelectedId}
                                clickHandler={onNodeClick}
                                renameHandler={onItemRename}
                                deleteHandler={onItemDelete}
                            />
                        ))}
                        <ListItem disablePadding sx={{ pt: 1 }}>
                            <Tooltip title={`Add ${labelSingular}`}>
                                <IconButton
                                    sx={{ color: "primary.light", mx: "auto" }}
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
