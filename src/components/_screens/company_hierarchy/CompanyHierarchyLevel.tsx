import { LevelDescriptor, State as CHState, Action as CHAction } from "companyHierarchy";
import { bindPopover, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import {ChangeEvent, ChangeEventHandler, useEffect, useState} from "react";

import {Box} from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";

import { default as CHNode } from "./CompanyHierarchyNode";
import {IconButton, ListItem, Popover, TextField, Tooltip} from "@mui/material";

type Props = LevelDescriptor & {
    state: CHState;
    dispatch: React.Dispatch<CHAction>;
};

export default function CompanyHierarchyLevel({ state, dispatch, index, label, addFn, getFn, renameFn, deleteFn }: Props) {
    const ownSelectedId = state.selectedIds[index];

    const [newItemName, setNewItemName] = useState("");

    const addPopup = usePopupState({ variant: "popover", popupId: "add-item" });

    // fetch for first level
    useEffect(() => {
        const fetchData = async () => {
            if (index !== 0) return;

            const data = await getFn();
            console.log('Level 0 fetch');
            dispatch({ type: "SetItems", level: index, items: data });
        };

        fetchData();
    }, [index]);

    // fetch for all other levels
    useEffect(() => {
        const fetchData = async () => {
            const previousLevelId = state.selectedIds[index - 1];
            if (previousLevelId === null || previousLevelId === undefined) return;

            const data = await getFn(previousLevelId);
            console.log(`Level 1 fetch, data len: ${data.length}`);
            dispatch({ type: "SetItems", level: index, items: data});
        }

        if (index > state.highestShownLevel) {
            dispatch({type: "SetItems", level: index, items: []});
            dispatch({ type: "SetSelectedId", level: index, id: null});
        }

        if (index === state.highestShownLevel) {
            if (state.selectedIds[index - 1] !== null) {
                fetchData();
            }
        }
    }, [index, state.selectedIds[index - 1], state.highestShownLevel])

    const onNodeClick = (id: number) => {
        dispatch({ type: "SetSelectedId", level: index, id });
    };

    const onNewItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemName(e.target.value);
    }

    const onNewItemKeyboardSubmit = (e: React.KeyboardEvent) => {
        if (e.key !== "Enter") return;
        if (!newItemName) return;

        onNewItemSubmit();
    }

    const onNewItemMouseSubmit = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!newItemName) return;

        onNewItemSubmit();
    }

    const onNewItemSubmit = async () => {
        let newNode;

        if (index === 0) {
            // We're on the site level - no parentId is needed when adding a node
            const newNodeRes = await addFn(newItemName);
            newNode = {id: newNodeRes.id, name: newNodeRes.name};
        } else {
            // ...otherwise, parent id is needed, as the new node will be the child of the node
            // selected on the previous level
            const previousSelectedId = state.selectedIds[index - 1];
            if (previousSelectedId === null || previousSelectedId === undefined) return;

            const newSiteRes = await addFn(newItemName, previousSelectedId);
            newNode = {id: newSiteRes.id, name: newSiteRes.name};
        }

        dispatch({ type: "AddItem", level: index, item: newNode})
        setNewItemName("");
        addPopup.close();
    }

    const onItemRename = async (id: number, name: string) => {
        await renameFn(id, name);
        dispatch({ type: "RenameItem", level: index, id: id, name: name });
        return true;
    }

    const onItemDelete = async(id: number) => {
        await deleteFn(id);
        dispatch({ type: "DeleteItem", level: index, id: id });
    }

    const addPopupElement = (
        <Popover {...bindPopover(addPopup)}>
            <TextField label="Name"
                       variant="filled"
                       autoFocus
                       onChange={onNewItemNameChange}
                       onKeyUp={onNewItemKeyboardSubmit}
                       onClick={(e) => e.stopPropagation()}
            />
            <IconButton sx={{color: "success.light" }}
                        disabled={!newItemName}
                        onClick={onNewItemMouseSubmit}>
                <CheckIcon />
            </IconButton>
        </Popover>
    );

    return (
        <>
            <Grid
                item
                sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                }}
            >
                <Typography sx={{ display: "flex", justifyContent: "center" }} variant="button">
                    {label}
                </Typography>
                <Divider />
                <Box sx={{ flexGrow: 1, height: 0 }} hidden={index > state.highestShownLevel}>
                    <List sx={{ height: "100%", overflowY: "auto" }}>
                        {state.items[index]!.map((item, i) => (
                            <CHNode
                                key={i}
                                item={item}
                                selected={item.id === ownSelectedId}
                                clickHandler={onNodeClick}
                                renameHandler={onItemRename}
                                deleteHandler={onItemDelete}
                            />
                        ))}
                        <ListItem disablePadding>
                            <Tooltip title="Add">
                                <IconButton sx={{ color: 'primary.light' }} {...bindTrigger(addPopup)}>
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
