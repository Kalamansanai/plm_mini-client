import React from 'react';
import { Params, useLoaderData } from 'react-router-dom';
import { config as apiConfig } from "api";
import { DetectorsApi, DetectorsGetByIdRes } from 'api_client';
import { Paper, Typography } from '@mui/material';

export async function loader({ params }: { params: Params }) {
    const id = params["detector_id"]! as any as number;

    let data = null;
    try {
        data = await new DetectorsApi(apiConfig).apiEndpointsDetectorsGetById({ id });
    } catch (err) {
        console.log(err); //TODO
    }

    return data;
}

export default function DetectorDetails() {
    const data = useLoaderData() as DetectorsGetByIdRes;

    return (
        <Paper sx={{height: '100%', width: '100%'}}>
            <Typography sx={{textTransform: 'uppercase', fontWeight: 'bold', margin: 1}}>{data.name!}</Typography>
        </Paper>
    )
}