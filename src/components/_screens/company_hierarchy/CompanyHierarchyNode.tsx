import useCHState, { Level } from "companyHierarchyProvider";
import SingleInputPopup from "components/popups/SingleInputPopup";
import { usePopupState } from "material-ui-popup-state/hooks";
import { useRef } from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import { CompanyHierarchyNode as CHNode } from "types";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, ListItem, ListItemButton, ListItemText, Tooltip } from "@mui/material";

import ConfirmPopup from "../../popups/ConfirmPopup";

type Props = {
    node: CHNode;
    labelSingular: string;
    selected: boolean;
    level: Level;
};

export default function CompanyHierarchyNode({ node, labelSingular, selected, level }: Props) {
    const { dispatch } = useCHState();
    const submit = useSubmit();
    const navigate = useNavigate();
    const renamePopup = usePopupState({ variant: "popover", popupId: "rename-item" });
    const deletePopup = usePopupState({ variant: "popover", popupId: "delete-item" });

    const listItemRef = useRef(null);

    const onClick = () => {
        dispatch({ type: "Select", level: level, id: node.id, submitFn: submit, navFn: navigate });
    };

    return (
        <>
            <ListItem disablePadding ref={listItemRef}>
                <ListItemButton selected={selected} onClick={onClick}>
                    <ListItemText>{node.name}</ListItemText>
                    <Tooltip title="Rename" followCursor>
                        <IconButton
                            sx={{ color: "secondary.light", p: 0 }}
                            className="hover"
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
                            className="hover"
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
            <SingleInputPopup
                popupProps={renamePopup}
                label="Name"
                initialValue={node.name}
                behavior={{
                    method: "post",
                    action: "edit",
                }}
            >
                <input readOnly hidden name="level" value={level} />
                <input readOnly hidden name="id" value={node.id} />
            </SingleInputPopup>
            <ConfirmPopup
                popupProps={deletePopup}
                text={
                    <>
                        Deleting {labelSingular} <i>{node.name}</i>
                    </>
                }
                method="post"
                action="delete"
            >
                <input readOnly hidden name="level" value={level} />
                <input readOnly hidden name="id" value={node.id} />
            </ConfirmPopup>
        </>
    );
}
