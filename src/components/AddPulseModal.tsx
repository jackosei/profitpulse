import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { TradePairs } from "../lib/constant";

interface AddPulseModalProps {
  open: boolean;
  onClose: () => void;
  onPulseAdded: (newPulse: {
    id: string;
    pair: string;
    description: string;
  }) => void;
}

const AddPulseModal: React.FC<AddPulseModalProps> = ({
  open,
  onClose,
  onPulseAdded,
}) => {
  const [pair, setPair] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const pulsesCollection = collection(db, "pulses");
      const docRef = await addDoc(pulsesCollection, { description, pair });
      onPulseAdded({ id: docRef.id, description, pair }); // Notify parent about the new pulse
      setDescription("");
      setPair("");
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding pulse: ", error);
      alert("Failed to add pulse. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add a New Pulse
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Pair/Account</InputLabel>
              <Select
                name="pair"
                value={pair}
                onChange={(event) => setPair(event.target.value)}
                required
              >
                {TradePairs.map((pair) => (
                  <MenuItem value={pair.name}>{pair.displayName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid size={12}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Add Pulse"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AddPulseModal;
