import React, { useState } from 'react';
import { Params, useLoaderData } from 'react-router-dom';
import { backend, config as apiConfig, DetailedError } from "api";
import { DetectorsApi} from 'api_client';
import { Paper, SortDirection, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { format } from 'date-fns';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


type Log = {
    timeStamp: string;
    temperature: number;
    storagePercentage: number;
    uptime: string;
    cpu: number;
    ram: number;
  };

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
        for (let i = 0; i < logs.length; i++) {
            console.log(logs[i]);
          }
    }
} catch (err) {
    throw new DetailedError(
        null,
        (
            <Typography fontSize="1em">
                Failed to fetch logs.
            </Typography>
        )
    );
}
    return logs;
}

export default function DetectorDetails() {
    const logs: Log[] = useLoaderData() as Log[];
    const celsiusSymbol = String.fromCharCode(8451);

    const [sortColumn, setSortColumn] = useState<keyof Log>('timeStamp');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
    const handleSort = (column: keyof Log) => {
      if (column === sortColumn) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    };
  
    const sortedLogs = logs.sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
  
      if (aValue < bValue) {
        return -1 * direction;
      } else if (aValue > bValue) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  
    if (sortedLogs.length === 0) {
      throw new DetailedError(
        null,
        (
          <Typography fontSize="1em">
            No logs found.
          </Typography>
        )
      );
    }
  
    return (
      <Paper sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="logs table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell onClick={() => handleSort('timeStamp')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <div style={{ flexGrow: 1 }} >Date</div>
                  {sortColumn === 'timeStamp' &&
                    (sortDirection === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: '1em' }} /> : <ArrowDownwardIcon sx={{ fontSize: '1em' }} />)}
                </div>
                </TableCell>
                <TableCell align="right" onClick={() => handleSort('temperature')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <div style={{ flexGrow: 1 }}>Temperature ({celsiusSymbol})</div>
                  {sortColumn === 'temperature' &&
                    (sortDirection === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: '1em' }} /> : <ArrowDownwardIcon sx={{ fontSize: '1em' }} />)}
                </div>
                </TableCell>
                <TableCell align="right" onClick={() => handleSort('storagePercentage')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <div style={{ flexGrow: 1 }} >Storage (%)</div>
                  {sortColumn === 'storagePercentage' &&
                    (sortDirection === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: '1em' }} /> : <ArrowDownwardIcon sx={{ fontSize: '1em' }} />)}
                </div>
                </TableCell>
                <TableCell align="right" onClick={() => handleSort('uptime')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <div style={{ flexGrow: 1 }} >Uptime</div>
                  {sortColumn === 'uptime' &&
                    (sortDirection === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: '1em' }} /> : <ArrowDownwardIcon sx={{ fontSize: '1em' }} />)}
                </div>
                </TableCell>
                <TableCell align="right" onClick={() => handleSort('cpu')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <div style={{ flexGrow: 1 }} >CPU (%)</div>
                  {sortColumn === 'cpu' &&
                    (sortDirection === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: '1em' }} /> : <ArrowDownwardIcon sx={{ fontSize: '1em' }} />)}
                </div>
                </TableCell>
                <TableCell align="right" onClick={() => handleSort('ram')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <div style={{ flexGrow: 1 }} >RAM (%)</div>
                  {sortColumn === 'ram' &&
                    (sortDirection === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: '1em' }} /> : <ArrowDownwardIcon sx={{ fontSize: '1em' }} />)}
                </div>
                </TableCell>
                <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {logs.map((log) => (
                    <TableRow>
                    <TableCell></TableCell>
                    <TableCell component="th" scope="row">
                    {format(new Date(log.timeStamp), 'yyyy-MM-dd HH:mm:ss')}
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
