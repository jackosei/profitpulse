import React from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Pulse, Statistics } from "../lib/types";

const PulseDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pulse, setPulse] = useState<Pulse | null>(null);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPulse = async () => {
      if (!id) return;

      try {
        const pulseDoc = doc(db, "pulses", id);
        const pulseSnapshot = await getDoc(pulseDoc);

        if (pulseSnapshot.exists()) {
          setPulse({
            ...(pulseSnapshot.data() as Pulse),
            id: pulseSnapshot.id,
          });
        } else {
          console.error("Pulse not found");
        }
      } catch (error) {
        console.error("Error fetching pulse:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPulse();
  }, [id]);

  if (isLoading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (!pulse) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Typography variant="h5" color="error">
          Oops! We couldn't find the pulse you were looking for. Please try
          again later.
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {/* Pulse Header */}
      <Grid size={12}>
        <Typography variant="h4">Pulse: {pulse.pair}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {pulse.description}
        </Typography>
      </Grid>

      {/* Statistics Section */}
      {statistics ? (
        <>
          <Grid size={3}>
            <Paper sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">Total Trades</Typography>
              <Typography variant="body1">{statistics.totalTrades}</Typography>
            </Paper>
          </Grid>
          <Grid size={3}>
            <Paper sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">Wins</Typography>
              <Typography variant="body1">{statistics.wins}</Typography>
            </Paper>
          </Grid>
          <Grid size={3}>
            <Paper sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">Losses</Typography>
              <Typography variant="body1">{statistics.losses}</Typography>
            </Paper>
          </Grid>
          <Grid size={3}>
            <Paper sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">Strike Rate</Typography>
              <Typography variant="body1">{statistics.strikeRate}%</Typography>
            </Paper>
          </Grid>
        </>
      ) : (
        <Grid size={12}>
          <Typography variant="body1" color="textSecondary">
            Statistics data is not available.
          </Typography>
        </Grid>
      )}

      {/* Summary Section */}
      <Grid size={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Summary</Typography>
          <Typography variant="body1" color="textSecondary">
            This section provides an overview of the pulse's performance.
          </Typography>
        </Paper>
      </Grid>

      {/* Profit Chart */}
      <Grid size={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Profit Chart</Typography>
          <Typography variant="body1" color="textSecondary">
            Chart placeholder.
          </Typography>
        </Paper>
      </Grid>

      {/* Paginated Trades Table */}
      <Grid size={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Trades</Typography>
          <Typography variant="body1" color="textSecondary">
            Include columns such as Trade Date, Pair, Profit/Loss, and Notes.
            Paginated
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PulseDashboard;
