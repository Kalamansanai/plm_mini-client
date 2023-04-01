import React from 'react';
import { Params, useLoaderData } from 'react-router-dom';
import { backend, config as apiConfig, DetailedError } from "api";
import { DetectorsApi, DetectorsGetByIdRes, ResponseError } from 'api_client';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { fontWeight } from '@mui/system';

export async function loader({ params }: { params: Params }) {
    const id = params["detector_id"]! as any as number;

    let data = null;
    let logs: unknown[] = [];
    try {
        data = await new DetectorsApi(apiConfig).apiEndpointsDetectorsGetById({ id });
        const response = await fetch(`${backend}/api/v1/detectors/${id}/getheartbeat`);

    if (response.status != 400){
        const temp = await response.json();
        logs = temp.heartBeats;
    } else {
        console.log("Failed to fetch logs");
    }   
    }catch (err) {
        if (err instanceof ResponseError) {
            throw new DetailedError(
                err,
                <Typography fontSize="1em">Failed to fetch logs.</Typography>
            );
        }
    }
    return logs;
}

export default function DetectorDetails() {
    const logs = useLoaderData() as DetectorsGetByIdRes;
    const celsiusSymbol = String.fromCharCode(8451);
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return (
        <Paper sx={{display: 'flex',flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center',}}>
            <Typography sx={{display: 'flex', textTransform: 'uppercase', fontWeight: 'bold', margin: 1}}>Detector: {logs.map(log => (log.macAddress))?.toString().match( /.{1,2}/g )!.join( ':' )}</Typography>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="logs table">
                <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Temperature ({celsiusSymbol})</TableCell>
                    <TableCell align="right">Storage (%)</TableCell>
                    <TableCell align="right">Uptime</TableCell>
                    <TableCell align="right">CPU (%)</TableCell>
                    <TableCell align="right">RAM (%)</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {logs.map((log) => (
                    <TableRow key={log.timestamp}>
                    <TableCell></TableCell>
                    <TableCell component="th" scope="row">
                        {timestamp}
                    </TableCell>
                    <TableCell align="right">{log.temperature}</TableCell>
                    <TableCell align="right">{log.storagePercentage}</TableCell>
                    <TableCell align="right">{log.uptime}</TableCell>
                    <TableCell align="right">{log.cpu}</TableCell>
                    <TableCell align="right">{log.ram}</TableCell>
                    <TableCell></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Paper>
    )
}
