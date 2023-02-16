import Title from "components/Title";
import { useState } from "react";
import { GetStepActionString, ObjectState } from "types";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, MenuItem, TextField, Tooltip } from "@mui/material";

import { Action, State, EditedStepFields } from "./reducer";

type Props = {
    state: { [K in keyof State]: NonNullable<State[K]> };
    dispatch: React.Dispatch<Action>;
};

const _defaultStepFields: EditedStepFields = {
    orderNum: 1,
    expectedInitialState: ObjectState.Present,
    expectedSubsequentState: ObjectState.Missing,
    object: null,
};

type StepFieldsErrors = Partial<
    Record<keyof Omit<EditedStepFields, "expectedInitialState" | "expectedSubsequentState">, string>
>;

export default function StepForm({ state, dispatch }: Props) {
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

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

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
    };

    const onDelete = () => {
        if (step) {
            dispatch({ type: "DeleteStep", uuid: step.uuid });
        }

        dispatch({ type: "Select", selection: null });
    };

    const onOrderNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[1-9][0-9]*$/;

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
                    <MenuItem key="remove" value={"remove"}>
                        Remove
                    </MenuItem>
                    <MenuItem key="replace" value={"replace"}>
                        Replace
                    </MenuItem>
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
                <Tooltip title={step ? "Delete step" : "Cancel"}>
                    <IconButton sx={{ color: "error.main", mb: 3 }} onClick={onDelete}>
                        {step ? <DeleteIcon fontSize="large" /> : <ClearIcon fontSize="large" />}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Save">
                    <IconButton
                        sx={{ color: "success.main", mb: 3 }}
                        type="submit"
                        disabled={Object.entries(errors).length > 0}
                    >
                        <CheckIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}
