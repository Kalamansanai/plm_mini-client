import Title from "components/Title";
import { Object, Step, TaskEditorSelectionType as SelectionType } from "types";

import { Box, MenuItem, TextField } from "@mui/material";

type Props = {
    selection: { name: string; type: SelectionType } | null;
    steps: Array<Step>;
    objects: Array<Object>;
};

export default function TaskComponentFields({ selection, steps, objects }: Props) {
    if (!selection || !selection.type) return null;

    if (selection.type === "object") {
        const object = objects.find((o) => o.name === selection.name);
        if (!object) {
            // TODO: error handling
            return null;
        }

        return (
            <Box display="flex" flexDirection="column" gap={2} p={2} mt={2} flexGrow={1}>
                <Title>Selected object</Title>
                <Box display="flex" gap={2} alignSelf="center" alignItems="center" flexGrow={1}>
                    <TextField required label="Name" name="name" />
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            size="small"
                            required
                            label="X"
                            name="x"
                            sx={{ width: "120px" }}
                        />
                        <TextField
                            size="small"
                            required
                            label="Width"
                            name="width"
                            sx={{ width: "120px" }}
                        />
                    </Box>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            size="small"
                            required
                            label="Y"
                            name="y"
                            sx={{ width: "120px" }}
                        />
                        <TextField
                            size="small"
                            required
                            label="Height"
                            name="height"
                            sx={{ width: "120px" }}
                        />
                    </Box>
                </Box>
            </Box>
        );
    } else {
        const step = steps.find((s) => s.object.name === selection.name);
        if (!step) {
            // TODO: error handling
            return null;
        }

        const objectsSelectArray = [
            <MenuItem key={""} value={""}>
                <i>None</i>
            </MenuItem>,
            ...objects.map((o: Object) => (
                <MenuItem key={o.id} value={o.id}>
                    {o.name}
                </MenuItem>
            )),
        ];

        return (
            <Box display="flex" flexDirection="column" gap={2} p={2} mt={2} flexGrow={1}>
                <Title>Selected step</Title>
                <Box display="flex" gap={2} alignSelf="center" alignItems="center" flexGrow={1}>
                    <TextField required label="Order" name="orderNum" sx={{ width: "120px" }} />
                    <TextField
                        required
                        select
                        label="Action"
                        name="action"
                        defaultValue={""}
                        sx={{ width: "240px" }}
                    >
                        <MenuItem value={""}>
                            <i>None</i>
                        </MenuItem>
                        <MenuItem value={"remove"}>Remove</MenuItem>
                        <MenuItem value={"replace"}>Replace</MenuItem>
                    </TextField>
                    <TextField
                        required
                        select
                        label="Object"
                        name="object"
                        defaultValue={""}
                        sx={{ width: "240px" }}
                    >
                        {objectsSelectArray}
                    </TextField>
                </Box>
            </Box>
        );
    }
}
