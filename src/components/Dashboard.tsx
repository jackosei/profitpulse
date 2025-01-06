import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

const Dashboard: React.FC = () => {
  // Placeholder data for Pulses table
  const pulses = [
    { id: 1, name: "EUR/USD", trades: 15, profit: 5.2 },
    { id: 2, name: "GBP/USD", trades: 8, profit: 2.8 },
  ];

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {/* Header */}
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Profit Pulse Dashboard
        </Typography>
      </Grid>

      {/* Key Statistics */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Total Trades: 23</Typography>
          <Typography variant="h6">Wins: 15</Typography>
          <Typography variant="h6">Losses: 8</Typography>
          <Typography variant="h6">Strike Rate: 65%</Typography>
        </Paper>
      </Grid>

      {/* Pulses Table */}
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Pulses
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Trades</TableCell>
                <TableCell align="right">Profit (%)</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pulses.map((pulse) => (
                <TableRow key={pulse.id}>
                  <TableCell>{pulse.name}</TableCell>
                  <TableCell align="right">{pulse.trades}</TableCell>
                  <TableCell align="right">{pulse.profit.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" size="small" color="primary">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
