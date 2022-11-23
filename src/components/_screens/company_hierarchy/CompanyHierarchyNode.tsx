import EditPopup from "components/popups/EditPopup";
import { usePopupState } from "material-ui-popup-state/hooks";
import { useRef } from "react";
import { CompanyHierarchyNode as CHNode } from "types";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, ListItem, ListItemButton, ListItemText, Tooltip } from "@mui/material";

import ConfirmPopup from "../../popups/ConfirmPopup";

type Props = {
    item: CHNode;
    selected: boolean;
    clickHandler: (id: number) => void;
    renameHandler: (id: number, name: string) => Promise<void>;
    deleteHandler: (id: number) => Promise<void>;
};

export default function CompanyHierarchyNode({
    item,
    selected,
    clickHandler,
    renameHandler,
    deleteHandler,
}: Props) {
    const renamePopup = usePopupState({ variant: "popover", popupId: "rename-item" });
    const deletePopup = usePopupState({ variant: "popover", popupId: "delete-item" });

    const listItemRef = useRef(null);

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        clickHandler(item.id);
    };

    const onRenameSubmit = async (input: string) => {
        if (input != item.name) {
            await renameHandler(item.id, input);
            return { close: true, resetText: false };
        }

        return { close: true, resetText: false };
    };

    const onDeleteConfirm = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await deleteHandler(item.id);
        deletePopup.close();
    };

    return (
        <>
            <ListItem disablePadding ref={listItemRef}>
                <ListItemButton selected={selected} onClick={onClick}>
                    <ListItemText>{item.name}</ListItemText>
                    <Tooltip title="Rename" followCursor>
                        <IconButton
                            sx={{ color: "secondary.light", p: 0 }}
                            className="hidden-icon"
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                renamePopup.open(e);
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" followCursor>
                        <IconButton
                            sx={{ color: "error.light", p: 0 }}
                            className="hidden-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                deletePopup.open(e);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemButton>
            </ListItem>
            <EditPopup
                popupProps={renamePopup}
                initialValue={item.name}
                label="Name"
                handler={onRenameSubmit}
            />
            <ConfirmPopup
                popupProps={deletePopup}
                text={
                    <>
                        Deleting <i>{item.name}</i>
                    </>
                }
                handler={onDeleteConfirm}
            />
        </>
    );
}
