import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TradeForm from "./TradeForm";
import { useAuth } from "../context/AuthContext";

const NavBar: React.FC = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [tradeFormOpen, setTradeFormOpen] = useState(false);
  const { logOut } = useAuth();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleSignOut = async () => {
    try {
      await logOut(); // Call the logOut method from AuthContext
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      handleMenuClose();
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Profit Pulse
        </Typography>
        <Button
          startIcon={<AddCircleIcon />}
          color="inherit"
          onClick={() => setTradeFormOpen(true)}
        >
          Trade
        </Button>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleSignOut}>Logout</MenuItem>
        </Menu>
        <TradeForm
          open={tradeFormOpen}
          onClose={() => setTradeFormOpen(false)}
        />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
