import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Pulse, Statistics } from "../lib/types";
import NavBar from "../components/NavBar";
import TradeForm from "../components/TradeForm";
import UtilityButton from "../components/UtilityButton";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const PulseDashboard: React.FC = () => {
  const { id: pulseId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pulse, setPulse] = useState<Pulse | null>(null);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tradeFormOpen, setTradeFormOpen] = useState(false);

  useEffect(() => {
    const fetchPulse = async () => {
      if (!pulseId) return;
      setIsLoading(true);

      try {
        const pulseDocRef = doc(db, "pulses", pulseId);
        const tradesCollectionRef = collection(db, `pulses/${pulseId}/trades`);
        const [pulseSnapshot, tradesSnapshot] = await Promise.all([
          getDoc(pulseDocRef),
          getDocs(tradesCollectionRef),
        ]);

        if (pulseSnapshot.exists()) {
          setPulse({
            ...(pulseSnapshot.data() as Pulse),
            id: pulseSnapshot.id,
          });
        } else {
          console.error("Pulse not found");
        }

        const trades = tradesSnapshot.docs.map((doc) => doc.data());
        const totalTrades = trades.length;
        const wins = trades.filter((trade) => trade.outcome === "win").length;
        const losses = totalTrades - wins;
        const strikeRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;

        setStatistics({ totalTrades, wins, losses, strikeRate });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPulse();
  }, [pulseId]);

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
    <Grid container spacing={2} sx={{ p: 3 }}>
      <NavBar />
      <Grid
        size={12}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">Pulse: {pulse.pair}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </Button>
      </Grid>
      <Grid size={12}>
        <Typography variant="subtitle1" color="textSecondary">
          {pulse.description}
        </Typography>
      </Grid>

      {statistics ? (
        ["Total Trades", "Wins", "Losses", "Strike Rate"].map(
          (label, index) => (
            <Grid key={index} size={3}>
              <Paper sx={{ padding: 2, textAlign: "center" }}>
                <Typography variant="h6">{label}</Typography>
                <Typography variant="body1">
                  {label === "Strike Rate"
                    ? `${statistics[label.toLowerCase().replace(" ", "")]}%`
                    : statistics[label.toLowerCase().replace(" ", "")]}
                </Typography>
              </Paper>
            </Grid>
          )
        )
      ) : (
        <Grid size={12}>
          <Typography variant="body1" color="textSecondary">
            Statistics data is not available.
          </Typography>
        </Grid>
      )}

      <Grid size={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Summary</Typography>
          <Typography variant="body1" color="textSecondary">
            This section provides an overview of the pulse's performance.
          </Typography>
        </Paper>
      </Grid>

      <Grid size={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Profit Chart</Typography>
          <Typography variant="body1" color="textSecondary">
            Chart placeholder.
          </Typography>
        </Paper>
      </Grid>

      <Grid size={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Trades</Typography>
          <Typography variant="body1" color="textSecondary">
            Include columns such as Trade Date, Pair, Profit/Loss, and Notes.
            Paginated
          </Typography>
        </Paper>
      </Grid>
      <UtilityButton handleClick={setTradeFormOpen} buttonText="Add Trade" />
      <TradeForm open={tradeFormOpen} onClose={() => setTradeFormOpen(false)} />
    </Grid>
  );
};

export default PulseDashboard;
