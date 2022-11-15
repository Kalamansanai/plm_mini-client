import { CompanyHierarchyNode as CHNode } from "types";

import { ListItem, ListItemButton, ListItemText } from "@mui/material";

type Props = {
    item: CHNode;
    selected: boolean;
    clickHandler: (id: number) => void;
};

export default function CompanyHierarchyNode({ item, selected, clickHandler }: Props) {
    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(`item named ${item.name} has been clicked`);
        clickHandler(item.id);
    };
    console.log(`item id: ${item.id}`);

    return (
        <ListItem disablePadding>
            <ListItemButton selected={selected} onClick={onClick}>
                <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
        </ListItem>
    );
}
