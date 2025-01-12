import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import NavBar from "./NavBar";
import AddPulseModal from "../components/AddPulseModal";
import UtilityButton from "../components/UtilityButton";

// Define the shape of a Pulse object
interface Pulse {
  id: string;
  description: string;
  pair: string;
}

interface Statistics {
  totalTrades: number;
  wins: number;
  losses: number;
  strikeRate: number;
  profitGainLoss: number;
}

const Dashboard: React.FC = () => {
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [stats, setStats] = useState<Statistics | null>({
    totalTrades: 0,
    wins: 0,
    losses: 0,
    strikeRate: 0,
    profitGainLoss: 0,
  });
  const [isLoadingPulses, setIsLoadingPulses] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch pulses and stats from Firestore
  useEffect(() => {
    const fetchPulses = async () => {
      const pulsesCollection = collection(db, "pulses");

      try {
        const pulsesSnapshot = await getDocs(pulsesCollection);
        const pulsesData = pulsesSnapshot.docs.map((doc) => ({
          ...(doc.data() as Pulse),
          id: doc.id,
        }));
        setPulses(pulsesData);
        setIsLoadingPulses(false);
      } catch (error) {
        console.error("Error fetching pulses:", error);
      }
    };

    const fetchStats = async () => {
      const statsDoc = doc(db, "stats", "summary");
      const statsSnapshot = await getDoc(statsDoc);
      if (statsSnapshot.exists()) {
        setStats(statsSnapshot.data() as Statistics);
      } else {
        console.error("Statistics document not found!");
      }
    };

    fetchPulses();
    fetchStats();
  }, []);

  const handlePulseAdded = (newPulse: Pulse) => {
    setPulses((prevPulses) => [...prevPulses, newPulse]);
  };

  return (
    <>
      {/* Navigation */}
      <NavBar />
      {/* Main Content */}
      <Grid container spacing={3} sx={{ p: 3 }}>
        {/* Header */}
        <Grid size={12}>
          <Typography variant="h4" gutterBottom>
            Welcome Back!
          </Typography>
        </Grid>

        {/* Key Statistics */}
        {stats ? (
          <Grid size={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">
                Total Trades: {stats.totalTrades}
              </Typography>
              <Typography variant="h6">Wins: {stats.wins}</Typography>
              <Typography variant="h6">Losses: {stats.losses}</Typography>
              <Typography variant="h6">
                Strike Rate: {stats.strikeRate}%
              </Typography>
              <Typography variant="h6">
                Profit Gain/Loss: ${stats.profitGainLoss}
              </Typography>
            </Paper>
          </Grid>
        ) : (
          <Typography>Loading Statistics</Typography>
        )}

        {/* Pulses Table */}
        <Grid size={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Pulses
            </Typography>
            <UtilityButton
              handleClick={setIsModalOpen}
              buttonText="Add Pulse"
            />
          </Box>
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
              {isLoadingPulses ? (
                <Typography>Loading Pulses...</Typography>
              ) : (
                <TableBody>
                  {pulses.map((pulse) => (
                    <TableRow key={pulse.id}>
                      <TableCell>{pulse.pair}</TableCell>
                      <TableCell>{pulse.description}</TableCell>
                      {/* <TableCell align="right">{pulse.trades}</TableCell>
                      <TableCell align="right">
                        {pulse.profit.toFixed(2)}
                      </TableCell> */}
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                        >
                          View
                        </Button>
                        <Tooltip title="Delete">
                          <IconButton color="error" size="small">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reset">
                          <IconButton color="secondary" size="small">
                            <RefreshIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Add Pulse Modal */}
      <AddPulseModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPulseAdded={handlePulseAdded}
      />
    </>
  );
};

export default Dashboard;
