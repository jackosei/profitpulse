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
  profitLossPct: number;
  outcome: string;
}

const TradeForm: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [formData, setFormData] = useState<TradeFormData>({
    date: "",
    profitLossPct: 0,
    outcome: "win",
  });

  const [error, setError] = useState<string>(""); // State to hold error message

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async () => {
    // Simple validation to check if all fields are filled
    if (!formData.date || isNaN(formData.profitLossPct)) {
      setError("Please fill all fields correctly.");
      return;
    }

    setError(""); // Reset error if form is valid

    try {
      // Add the trade data to Firestore
      await addDoc(collection(db, "trades"), formData);
      alert("Trade saved successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving trade:", error);
      alert("Failed to save trade. Please try again.");
    }

    setFormData({ date: "", profitLossPct: 0, outcome: "win" });
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
          onChange={(event) =>
            handleInputChange(event as SelectChangeEvent<string>)
          }
          InputLabelProps={{ shrink: true }}
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
            onChange={(event) =>
              handleInputChange(event as SelectChangeEvent<string>)
            }
          >
            {TradeOutcomes.map((outcome) => (
              <MenuItem value={outcome.toLowerCase()}>{outcome}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Display error message */}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Trade
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TradeForm;
