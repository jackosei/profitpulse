import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const PulseDashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      {/* Row 1: Four columns */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" color={theme.palette.text.primary}>
            Average Win $
          </Typography>
          <Typography variant="body1" color={theme.palette.text.secondary}>
            $500
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" color={theme.palette.text.primary}>
            Average Loss $
          </Typography>
          <Typography variant="body1" color={theme.palette.text.secondary}>
            $300
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" color={theme.palette.text.primary}>
            Strike Rate %
          </Typography>
          <Typography variant="body1" color={theme.palette.text.secondary}>
            65%
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" color={theme.palette.text.primary}>
            Gain/Loss (Last 100 Trades)
          </Typography>
          <Typography variant="body1" color={theme.palette.text.secondary}>
            $2000
          </Typography>
        </Paper>
      </Grid>

      {/* Row 2: Two columns */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 2,
          }}
        >
          <Typography variant="h6" color={theme.palette.text.primary}>
            Summary
          </Typography>
          <Typography variant="body1" color={theme.palette.text.secondary}>
            Here's a brief summary of your performance.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 2,
          }}
        >
          <Typography variant="h6" color={theme.palette.text.primary}>
            Profit Chart
          </Typography>
          <Typography variant="body1" color={theme.palette.text.secondary}>
            Chart placeholder
          </Typography>
        </Paper>
      </Grid>

      {/* Row 3: Placeholder */}
      <Grid item xs={12}>
        <Paper
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 2,
          }}
        >
          <Typography variant="h6" color={theme.palette.text.primary}>
            Paginated Trades Table
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PulseDashboard;
