import { Modal, Box, Typography, TextField, Button } from "@mui/material"

interface ConfirmationModalProps {
	open: boolean
	onClose: () => void
	onConfirm: () => void
	title: string
	message: string
	inputValue: string
	setInputValue: (value: string) => void
	placeholder: string
	confirmButtonText: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	open,
	onClose,
	onConfirm,
	title,
	message,
	inputValue,
	setInputValue,
	placeholder,
	confirmButtonText,
}) => {
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
					p: 4,
					borderRadius: 2,
					boxShadow: 24,
				}}
			>
				<Typography variant="h6" gutterBottom>
					{title}
				</Typography>
				<Typography variant="body2" gutterBottom>
					{message}
				</Typography>
				<TextField
					fullWidth
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder={placeholder}
				/>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						marginTop: 2,
					}}
				>
					<Button variant="contained" color="primary" onClick={onConfirm}>
						{confirmButtonText}
					</Button>
					<Button variant="outlined" onClick={onClose}>
						Cancel
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default ConfirmationModal
