import Title from "components/Title";
import { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, MenuItem, TextField, Tooltip } from "@mui/material";

import { Action, EditedObjectFields, State } from "./reducer";

type Props = {
    state: { [K in keyof State]: NonNullable<State[K]> };
    dispatch: React.Dispatch<Action>;
};

const _defaultObjectFields: EditedObjectFields = {
    name: "",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
};

type ObjectFieldsErrors = Partial<Record<keyof EditedObjectFields, string>>;

export default function ObjectForm({ state, dispatch }: Props) {
    // The object we're currently editing. If we're not editing an object but creating a new one,
    // this is undefined.
    const object = state.task.objects.find((o) => o.uuid === state.selection.uuid);

    const [errors, setErrors] = useState<ObjectFieldsErrors>({});

    const defaultFields = object
        ? {
              name: object.name,
              x: object.coordinates.x,
              y: object.coordinates.y,
              width: object.coordinates.width,
              height: object.coordinates.height,
          }
        : _defaultObjectFields;

    const [fields, setFields] = useState(defaultFields);

    const validateCoords = (
        fieldName: keyof EditedObjectFields,
        fieldValue: number,
        errors: ObjectFieldsErrors
    ) => {
        const regex = /(^\-[1-9][0-9]*$)|(^[0-9]+$)/;

        if (!regex.test(fieldValue.toString())) {
            errors[fieldName] = "Must be a number";
        } else {
            const val = Number(fieldValue);
            if (val < 0) {
                errors[fieldName] = "Must be >= 0";
            } else {
                delete errors[fieldName];
            }
        }
    };

    // TODO(rg): hopefully someone that is not me will clean up the validation in the future
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFields = { ...fields, [e.target.name]: e.target.value };
        const newErrors = { ...errors };

        if (!newFields.name.length) {
            newErrors.name = "Name must be non-empty";
        } else {
            delete newErrors.name;
        }

        validateCoords("x", newFields.x, newErrors);
        validateCoords("y", newFields.y, newErrors);
        validateCoords("width", newFields.width, newErrors);
        validateCoords("height", newFields.height, newErrors);

        setErrors(newErrors);
        setFields(newFields);
    };

    const onDelete = () => {
        if (object) {
            dispatch({ type: "DeleteObject", uuid: object.uuid });
        }

        dispatch({ type: "Select", selection: null });
    };

    const onSubmit = () => {
        if (object) {
            dispatch({
                type: "EditObject",
                uuid: object.uuid,
                name: fields.name,
                coordinates: {
                    x: fields.x,
                    y: fields.y,
                    width: fields.width,
                    height: fields.height,
                },
            });
        } else {
            dispatch({
                type: "NewObject",
                name: fields.name,
                coordinates: {
                    x: fields.x,
                    y: fields.y,
                    width: fields.width,
                    height: fields.height,
                },
            });
        }

        dispatch({ type: "Select", selection: null });
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} p={2} mt={2} flexGrow={1}>
            <Title>{object ? "Selected object" : "New object"}</Title>
            <Box
                component="form"
                display="flex"
                gap={2}
                alignSelf="center"
                alignItems="center"
                flexGrow={1}
                onSubmit={onSubmit}
            >
                <TextField
                    required
                    autoFocus
                    error={!!errors.name}
                    helperText={errors.name ?? " "}
                    label="Name"
                    name="name"
                    sx={{ width: "180px " }}
                    value={fields.name}
                    onChange={onChange}
                />
                <TextField
                    required
                    error={!!errors.x}
                    helperText={errors.x ?? " "}
                    label="X"
                    name="x"
                    sx={{ width: "100px" }}
                    value={fields.x}
                    onChange={onChange}
                />
                <TextField
                    required
                    error={!!errors.width}
                    helperText={errors.width ?? " "}
                    label="Width"
                    name="width"
                    sx={{ width: "100px" }}
                    value={fields.width}
                    onChange={onChange}
                />
                <TextField
                    required
                    error={!!errors.y}
                    helperText={errors.y ?? " "}
                    label="Y"
                    name="y"
                    sx={{ width: "100px" }}
                    value={fields.y}
                    onChange={onChange}
                />
                <TextField
                    required
                    error={!!errors.height}
                    helperText={errors.height ?? " "}
                    label="Height"
                    name="height"
                    sx={{ width: "100px" }}
                    value={fields.height}
                    onChange={onChange}
                />
                <Tooltip title={object ? "Delete object" : "Cancel"}>
                    <IconButton sx={{ color: "error.main", mb: 3 }} onClick={onDelete}>
                        {object ? <DeleteIcon fontSize="large" /> : <ClearIcon fontSize="large" />}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Save">
                    <IconButton
                        type="submit"
                        sx={{ color: "success.main", mb: 3 }}
                        disabled={Object.entries(errors).length > 0}
                    >
                        <CheckIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}
