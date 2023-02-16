import { backend } from "api";
import axios from "axios";
import { ChangeEvent, useState } from "react";

function FileUploadSingle() {
    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (!file) {
            return;
        }

        var bodyFormData = new FormData();
        8;
        bodyFormData.append("Name", `${file.name}`);
        bodyFormData.append("Type", "Code");
        bodyFormData.append("File", file);

        // 👇 Uploading the file using the fetch API to the server
        axios({
            url: `${backend}/api/v1/files/upload`,
            method: "POST",
            data: bodyFormData,

            headers: {
                "content-type": "multipart/form-data",
            },
        });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />

            <div>{file && `${file.name} - ${file.type}`}</div>

            <button onClick={handleUploadClick}>Upload</button>
        </div>
    );
}

export default FileUploadSingle;
