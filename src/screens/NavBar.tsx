import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import TradeForm from "../components/TradeForm";
import { useAuth } from "../context/AuthContext";
import UtilityButton from "../components/UtilityButton";
import { useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [tradeFormOpen, setTradeFormOpen] = useState(false);
  const { logOut } = useAuth();
  const location = useLocation();

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

  // Check if we are on the PulseDashboard route
  const isPulseDashboard = location.pathname.startsWith("/pulse");

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Profit Pulse
        </Typography>
        {!isPulseDashboard && (
          <UtilityButton
            handleClick={setTradeFormOpen}
            buttonText="Add Trade"
          />
        )}
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
