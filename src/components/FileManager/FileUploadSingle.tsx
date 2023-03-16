import { backend } from "api";
import axios from "axios";
import { bindPopover, PopupState, usePopupState } from "material-ui-popup-state/hooks";
import { ChangeEvent, useState } from "react";
import { useFetcher } from "react-router-dom";

import { Box, Button, Grid, Popover, Popper, TextField, Typography } from "@mui/material";

async function handleUploadClick(
    file: File | undefined,
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>,
    setSuccessful: React.Dispatch<React.SetStateAction<boolean>>
) {
    if (!file) {
        return;
    }

    var bodyFormData = new FormData();
    8;
    bodyFormData.append("Name", `${file.name}`);
    bodyFormData.append("Type", "Code");
    bodyFormData.append("File", file);

    // 👇 Uploading the file using the fetch API to the server
    const res = await fetch(`${backend}/api/v1/files/upload`, {
        method: "POST",
        body: bodyFormData,

        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    if (res.status != 400) {
        setFile(undefined);
        setSuccessful(true);
    }
}

function FileUploadSingle() {
    const [file, setFile] = useState<File>();
    const [successful, setSuccessful] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ height: "40%", width: "80%" }}
        >
            <Typography variant="h5" sx={{ mb: 5 }}>
                File Upload:
            </Typography>
            <input type="file" onChange={handleFileChange} />

            <Typography>{file && `${file.name} - ${file.type}`}</Typography>

            <Button
                variant="outlined"
                onClick={() => {
                    handleUploadClick(file, setFile, setSuccessful);
                }}
                sx={{ mt: 2, mb: 2, width: "40%" }}
            >
                Upload
            </Button>
            {successful ? (
                <Typography sx={{ color: "green" }}> File uploaded susccessfully ! </Typography>
            ) : null}
        </Grid>
    );
}

export default FileUploadSingle;
