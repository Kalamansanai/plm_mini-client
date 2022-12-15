import Title from "components/Title";
import { useEffect, useState } from "react";
import { GetStepActionString, ObjectState } from "types";
import { v4 as uuidv4 } from "uuid";

import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, MenuItem, TextField, Tooltip } from "@mui/material";

import {
    Action,
    EditedObject,
    EditedStep,
    EditedObjectFields,
    Selection,
    State,
    SnapshotSize,
    EditedStepFields,
} from "./taskEditorReducer";

type Props = {
    state: State;
    dispatch: React.Dispatch<Action>;
};

type ChildProps = {
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

function ObjectFields({ state, dispatch }: ChildProps) {
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

    const reset = () => {
        setFields(defaultFields);
        setErrors({});
    };

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

        reset();
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

        reset();
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
                <IconButton sx={{ color: "error.main", mb: 3 }} onClick={onDelete}>
                    <DeleteIcon fontSize="large" />
                </IconButton>
                <IconButton
                    type="submit"
                    sx={{ color: "success.main", mb: 3 }}
                    disabled={Object.entries(errors).length > 0}
                >
                    <CheckIcon fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    );
}

const _defaultStepFields: EditedStepFields = {
    orderNum: 1,
    expectedInitialState: ObjectState.Present,
    expectedSubsequentState: ObjectState.Missing,
    object: null,
};

type StepFieldsErrors = Partial<
    Record<keyof Omit<EditedStepFields, "expectedInitialState" | "expectedSubsequentState">, string>
>;

function StepFields({ state, dispatch }: ChildProps) {
    const step = state.task.steps.find((s) => s.uuid === state.selection.uuid);

    const [errors, setErrors] = useState<StepFieldsErrors>({});

    const defaultFields = step ? (step as EditedStepFields) : _defaultStepFields;

    const [fields, setFields] = useState(defaultFields);

    const objectsSelectArray = [
        <MenuItem key={""} value={""}>
            <i>None</i>
        </MenuItem>,
        ...state.task.objects.map((o) => (
            <MenuItem key={o.uuid} value={o.uuid}>
                {o.name}
            </MenuItem>
        )),
    ];

    const reset = () => {
        setFields(defaultFields);
        setErrors({});
    };

    const onSubmit = () => {
        if (step) {
            dispatch({
                type: "EditStep",
                uuid: step.uuid,
                orderNum: fields.orderNum,
                expectedInitialState: fields.expectedInitialState,
                expectedSubsequentState: fields.expectedSubsequentState,
                object: fields.object!,
            });
        } else {
            dispatch({
                type: "NewStep",
                orderNum: fields.orderNum,
                expectedInitialState: fields.expectedInitialState,
                expectedSubsequentState: fields.expectedSubsequentState,
                object: fields.object!,
            });
        }

        dispatch({ type: "Select", selection: null });

        reset();
    };

    const onDelete = () => {
        if (step) {
            dispatch({ type: "DeleteStep", uuid: step.uuid });
        }

        dispatch({ type: "Select", selection: null });

        reset();
    };

    const onOrderNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[1-9]+$/;

        if (!regex.test(e.target.value)) {
            setErrors({ ...errors, orderNum: "Order must be higher than 0" });
        } else {
            setErrors(() => {
                const newErrors = { ...errors };
                delete newErrors.orderNum;
                return newErrors;
            });
        }

        // NOTE(rg): `e.target.value` is a string, even if we put `type=number` on the input
        // (which we didn't)
        setFields({ ...fields, orderNum: e.target.value as any });
    };

    // TODO(rg): this textfield might break if the action isn't `remove` or `replace`
    const onActionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "remove") {
            setFields({
                ...fields,
                expectedInitialState: ObjectState.Present,
                expectedSubsequentState: ObjectState.Missing,
            });
        } else if (e.target.value === "replace") {
            setFields({
                ...fields,
                expectedInitialState: ObjectState.Missing,
                expectedSubsequentState: ObjectState.Present,
            });
        }
    };

    const onObjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uuid = e.target.value;
        if (uuid.length) {
            const object = state.task.objects.find((o) => o.uuid === uuid);
            if (!object) {
                setErrors({ ...errors, object: "The step must refer to an existing object" });
                setFields({ ...fields, object: null });
            } else {
                const conflicting = state.task.steps.filter((s) => {
                    let condition = s.object.uuid === uuid && s.orderNum === fields.orderNum;
                    if (step) condition = condition && s.uuid !== step.uuid;

                    return condition;
                });
                // TODO(rg): validation doesn't fail here when it should. figure out why
                if (conflicting.length) {
                    setErrors({
                        ...errors,
                        object: "Multiple steps with the same order can't refer to the same object",
                    });
                } else {
                    setErrors(() => {
                        const newErrors = { ...errors };
                        delete newErrors.object;
                        return newErrors;
                    });
                }
                setFields({ ...fields, object });
            }
        } else {
            setErrors({ ...errors, object: "The step must refer to an object" });
            setFields({ ...fields, object: null });
        }
    };

    let action = GetStepActionString(fields.expectedInitialState, fields.expectedSubsequentState);
    if (action !== "remove" && action !== "replace") {
        action = "";
    }

    return (
        <Box display="flex" flexDirection="column" gap={2} p={2} mt={2} flexGrow={1}>
            <Title>{step ? "Selected step" : "New step"}</Title>
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
                    error={!!errors.orderNum}
                    helperText={errors.orderNum ?? " "}
                    label="Order"
                    name="orderNum"
                    value={fields.orderNum}
                    onChange={onOrderNumChange}
                    sx={{ width: "120px" }}
                />
                <TextField
                    required
                    select
                    helperText=" "
                    label="Action"
                    name="action"
                    value={action}
                    onChange={onActionChange}
                    sx={{ width: "240px" }}
                >
                    <MenuItem value={"remove"}>Remove</MenuItem>
                    <MenuItem value={"replace"}>Replace</MenuItem>
                </TextField>
                <TextField
                    required
                    error={!!errors.object}
                    helperText={errors.object ?? " "}
                    select
                    label="Object"
                    name="object"
                    value={fields.object?.uuid ?? ""}
                    onChange={onObjectChange}
                    sx={{ width: "240px" }}
                >
                    {objectsSelectArray}
                </TextField>
                <IconButton sx={{ color: "error.main", mb: 3 }} onClick={onDelete}>
                    <DeleteIcon fontSize="large" />
                </IconButton>
                <IconButton
                    sx={{ color: "success.main", mb: 3 }}
                    type="submit"
                    disabled={Object.entries(errors).length > 0}
                >
                    <CheckIcon fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    );
}

export default function TaskComponentFields({ state, dispatch }: Props) {
    if (!state.selection) return null;

    // TODO(rg): figure out how to make typescript accepts this without the 'as any' hack. It
    // should be possible, because we just checked that state.selection exists
    if (state.selection.selectionType === "object") {
        return <ObjectFields state={state as any} dispatch={dispatch} />;
    } else {
        return <StepFields state={state as any} dispatch={dispatch} />;
    }
}
