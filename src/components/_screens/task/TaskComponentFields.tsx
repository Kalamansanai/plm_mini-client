import Title from "components/Title";
import { useEffect, useState } from "react";
import { Coordinates, Object, Step } from "types";

import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, MenuItem, TextField, Tooltip } from "@mui/material";

import { Action, EditedObject, EditedStep, Selection, State } from "./taskEditorReducer";

type Props = {
    state: State;
    dispatch: React.Dispatch<Action>;
};

type ChildProps = {
    state: { [K in keyof State]: NonNullable<State[K]> };
    dispatch: React.Dispatch<Action>;
};

const defaultCoords: Coordinates = { x: 0, y: 0, width: 100, height: 100 };

function ObjectFields({ state, dispatch }: ChildProps) {
    // The object we're currently editing. If we're not editing an object but creating a new one,
    // this is undefined.
    const object = state.task.objects.find((o) => o.uuid === state.selection.uuid);

    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState(state.selection.new ? "" : object?.name ?? "");
    const [coordinates, setCoordinates] = useState(
        state.selection.new ? defaultCoords : object?.coordinates ?? defaultCoords
    );

    // NOTE(rg): I don't like this
    useEffect(() => {
        setName(object?.name ?? "");
        setCoordinates(object?.coordinates ?? defaultCoords);
    }, [state.selection]);

    if (!object && !state.selection.new) {
        // TODO: invalid state (editing an object that doesn't exist within the objects list); error handling
        return null;
    }

    const reset = () => {
        setName("");
        setCoordinates(defaultCoords);
        setError(null);
    };

    const onNameChange = (value: string) => {
        let err = false;
        if (state.selection.new) err = !!state.task.objects.find((o) => o.name === value);
        else {
            err = !!state.task.objects
                .filter((o) => o.uuid !== object!.uuid)
                .find((o) => o.name === value);
        }

        if (err) {
            setError("An other object exists with the same name");
        } else {
            setError(null);
        }

        setName(value);
    };

    const onDelete = () => {
        if (object && !state.selection.new) {
            dispatch({ type: "DeleteObject", uuid: object.uuid });
        }

        dispatch({ type: "Select", selection: null });

        reset();
    };

    const onSubmit = () => {
        if (state.selection.new) {
            dispatch({ type: "NewObject", name, coordinates });
        } else {
            dispatch({ type: "EditObject", uuid: object!.uuid, name, coordinates });
        }

        dispatch({ type: "Select", selection: null });

        reset();
    };
    return (
        <Box display="flex" flexDirection="column" gap={2} p={2} mt={2} flexGrow={1}>
            <Title>{state.selection.new ? "New object" : "Selected object"}</Title>
            <Box display="flex" gap={2} alignSelf="center" alignItems="center" flexGrow={1}>
                <TextField
                    error={error != null}
                    helperText={error}
                    required
                    label="Name"
                    name="name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onNameChange(e.target.value)
                    }
                />
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        size="small"
                        required
                        label="X"
                        name="x"
                        sx={{ width: "120px" }}
                        value={coordinates?.x ?? 0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setCoordinates({ ...coordinates, x: Number(e.target.value) })
                        }
                    />
                    <TextField
                        size="small"
                        required
                        label="Width"
                        name="width"
                        sx={{ width: "120px" }}
                        value={coordinates?.width ?? 0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setCoordinates({ ...coordinates, width: Number(e.target.value) })
                        }
                    />
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        size="small"
                        required
                        label="Y"
                        name="y"
                        sx={{ width: "120px" }}
                        value={coordinates?.y ?? 0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setCoordinates({ ...coordinates, y: Number(e.target.value) })
                        }
                    />
                    <TextField
                        size="small"
                        required
                        label="Height"
                        name="height"
                        sx={{ width: "120px" }}
                        value={coordinates?.height ?? 0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setCoordinates({ ...coordinates, height: Number(e.target.value) })
                        }
                    />
                </Box>
                <IconButton sx={{ color: "error.main" }} onClick={onDelete}>
                    <DeleteIcon fontSize="large" />
                </IconButton>
                <IconButton
                    sx={{ color: "success.main" }}
                    disabled={error !== null}
                    onClick={onSubmit}
                >
                    <CheckIcon fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    );
}

function StepFields({ state, dispatch }: ChildProps) {
    const step = state.task.steps.find((s) => s.uuid === state.selection.uuid);
    if (!step) {
        // TODO: error handling
        return null;
    }

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

    return (
        <Box display="flex" flexDirection="column" gap={2} p={2} mt={2} flexGrow={1}>
            <Title>{state.selection.new ? "New step" : "Selected step"}</Title>
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
                <IconButton sx={{ color: "error.main" }}>
                    <DeleteIcon fontSize="large" />
                </IconButton>
                <IconButton sx={{ color: "success.main" }}>
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
