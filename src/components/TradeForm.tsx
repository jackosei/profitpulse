import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { TradeOutcomes } from "../lib/constant";

interface TradeFormData {
  date: string;
  riskPct: number;
  profitLossPct: number;
  outcome: string;
}

const TradeForm: React.FC<{
  open: boolean;
  onClose: () => void;
  pulseId: string | null;
}> = ({ open, onClose, pulseId }) => {
  const [formData, setFormData] = useState<TradeFormData>({
    date: "",
    riskPct: 0,
    profitLossPct: 0,
    outcome: "win",
  });

  const [error, setError] = useState<string>("");

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!pulseId) {
      setError("Error: No active pulse found.");
      return;
    }

    if (!formData.date || isNaN(formData.profitLossPct)) {
      setError("Please fill all fields correctly.");
      return;
    }

    setError("");

    try {
      // Save the trade inside the pulse's "trades" subcollection
      await addDoc(collection(db, `pulses/${pulseId}/trades`), formData);
      alert("Trade saved successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving trade:", error);
      alert("Failed to save trade. Please try again.");
    }

    setFormData({ date: "", riskPct: 0, profitLossPct: 0, outcome: "win" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Log a Trade</DialogTitle>
      <DialogContent>
        <TextField
          label="Date"
          name="date"
          type="date"
          fullWidth
          value={formData.date}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Risk %"
          name="riskPct"
          type="number"
          fullWidth
          value={formData.riskPct}
          onChange={handleInputChange}
        />
        <TextField
          label="Profit/Loss %"
          name="profitLossPct"
          type="number"
          fullWidth
          value={formData.profitLossPct}
          onChange={handleInputChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Outcome</InputLabel>
          <Select
            name="outcome"
            value={formData.outcome}
            onChange={handleInputChange}
          >
            {TradeOutcomes.map((outcome) => (
              <MenuItem key={outcome} value={outcome.toLowerCase()}>
                {outcome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Trade
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TradeForm;
