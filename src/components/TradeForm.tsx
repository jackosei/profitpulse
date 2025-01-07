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

const TradeForm: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    date: "",
    pair: "",
    profitLossPct: 0,
    outcome: "win",
  });

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting trade:", formData);
    // TODO: Add Firebase integration to save trade
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
        <FormControl fullWidth margin="normal">
          <InputLabel>Pair/Account</InputLabel>
          <Select
            name="pair"
            value={formData.pair}
            onChange={(event) =>
              handleInputChange(event as SelectChangeEvent<string>)
            }
          >
            <MenuItem value="EURUSD">EUR/USD</MenuItem>
            <MenuItem value="GBPUSD">GBP/USD</MenuItem>
            <MenuItem value="USDJPY">USD/JPY</MenuItem>
          </Select>
        </FormControl>
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
            <MenuItem value="win">Win</MenuItem>
            <MenuItem value="loss">Loss</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Trade
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TradeForm;
