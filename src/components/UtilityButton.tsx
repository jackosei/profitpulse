import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface UtilityButtonProps {
  handleClick: (open: boolean) => void;
  buttonText: string;
}

const UtilityButton: React.FC<UtilityButtonProps> = ({
  handleClick,
  buttonText,
}) => {
  return (
    <Button
      startIcon={<AddCircleIcon />}
      color="inherit"
      onClick={() => handleClick(true)}
    >
      {buttonText}
    </Button>
  );
};

export default UtilityButton;
