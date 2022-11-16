import { CompanyHierarchyNode as CHNode } from "types";

import {IconButton, ListItem, ListItemButton, ListItemText, Tooltip} from "@mui/material";
import {usePopupState} from "material-ui-popup-state/hooks";
import {useRef} from "react";
import RenamePopup from "components/popups/RenamePopup";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
    item: CHNode;
    selected: boolean;
    clickHandler: (id: number) => void;
    renameHandler: (id: number, name: string) => Promise<boolean>;
};

export default function CompanyHierarchyNode({ item, selected, clickHandler, renameHandler }: Props) {
    const renamePopup = usePopupState({ variant: "popover", popupId: "rename-item" });
    const deletePopup = usePopupState({ variant: "popover", popupId: "delete-item" });

    const listItemRef = useRef(null);

    if (listItemRef.current !== null) {
        renamePopup.setAnchorEl(listItemRef.current);
        deletePopup.setAnchorEl(listItemRef.current);
    }

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        clickHandler(item.id);
    };

    const onRenameSubmit = async (input: string) => {
        if (input != item.name) {
            const success = await renameHandler(item.id, input);
            return success;
        }

        return false;
    }

    return (
        <>
            <ListItem disablePadding ref={listItemRef}>
                <ListItemButton selected={selected} onClick={onClick}>
                    <ListItemText>{item.name}</ListItemText>
                    <Tooltip title="Rename" followCursor>
                        <IconButton
                            sx={{ color: "secondary.light", p: 0 }}
                            className="hidden-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                renamePopup.open(listItemRef.current);
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemButton>
            </ListItem>
            <RenamePopup popupProps={renamePopup} initialValue={item.name} label="Name" handler={onRenameSubmit} />
        </>
    );
}
