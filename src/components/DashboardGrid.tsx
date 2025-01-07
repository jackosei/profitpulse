import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const DashboardGrid: React.FC = () => (
  <Grid container spacing={2}>
    {/* Row 1: Four columns */}
    <Grid item xs={12} sm={6} md={3}>
      <Paper>Average Win $</Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Paper>Average Loss $</Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Paper>Strike Rate %</Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Paper>Gain/Loss (Last 100 Trades)</Paper>
    </Grid>

    {/* Row 2: Two columns */}
    <Grid item xs={12} md={6}>
      <Paper>Summary</Paper>
    </Grid>
    <Grid item xs={12} md={6}>
      <Paper>Profit Chart</Paper>
    </Grid>

    {/* Row 3: Placeholder */}
    <Grid item xs={12}>
      <Paper>Paginated Trades Table</Paper>
    </Grid>
  </Grid>
);

export default DashboardGrid;
