import React, { useState } from "react";
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

const NavBar: React.FC = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [tradeFormOpen, setTradeFormOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
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
          +Trade
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
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
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
