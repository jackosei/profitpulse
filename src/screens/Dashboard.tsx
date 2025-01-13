import React, { useState, useEffect } from "react"
import { db } from "../firebaseConfig"
import { collection, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore"
import {
	Typography,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
	Tooltip,
	Box,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import DeleteIcon from "@mui/icons-material/Delete"
import RefreshIcon from "@mui/icons-material/Refresh"
import ConfirmationModal from "../components/ConfirmationModal"
import NavBar from "./NavBar"
import AddPulseModal from "../components/AddPulseModal"
import UtilityButton from "../components/UtilityButton"

interface Pulse {
	id: string
	description: string
	pair: string
}

interface Statistics {
	totalTrades: number
	wins: number
	losses: number
	strikeRate: number
	profitGainLoss: number
}

const Dashboard: React.FC = () => {
	const [pulses, setPulses] = useState<Pulse[]>([])
	const [selectedPulse, setSelectedPulse] = useState<Pulse | null>(null)
	const [confirmationInput, setConfirmationInput] = useState("")
	const [isPulseModalOpen, setIsPulseModalOpen] = useState(false)
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
	const [modalType, setModalType] = useState<"delete" | "reset" | null>(null)
	const [stats, setStats] = useState<Statistics | null>({
		totalTrades: 0,
		wins: 0,
		losses: 0,
		strikeRate: 0,
		profitGainLoss: 0,
	})
	const [isLoadingPulses, setIsLoadingPulses] = useState<boolean>(true)

	useEffect(() => {
		const fetchPulses = async () => {
			const pulsesCollection = collection(db, "pulses")
			try {
				const pulsesSnapshot = await getDocs(pulsesCollection)
				const pulsesData = pulsesSnapshot.docs.map((doc) => ({
					...(doc.data() as Pulse),
					id: doc.id,
				}))
				setPulses(pulsesData)
				setIsLoadingPulses(false)
			} catch (error) {
				console.error("Error fetching pulses:", error)
			}
		}

		const fetchStats = async () => {
			const statsDoc = doc(db, "stats", "summary")
			const statsSnapshot = await getDoc(statsDoc)
			if (statsSnapshot.exists()) {
				setStats(statsSnapshot.data() as Statistics)
			} else {
				console.error("Statistics document not found!")
			}
		}

		fetchPulses()
		fetchStats()
	}, [])

	const handlePulseAdded = (newPulse: Pulse) => {
		setPulses((prevPulses) => [...prevPulses, newPulse])
	}

	const handleActionClick = (pulse: Pulse, action: "delete" | "reset") => {
		setSelectedPulse(pulse)
		setConfirmationInput("")
		setModalType(action)
		setIsConfirmationModalOpen(true)
	}

	const handleActionConfirm = async () => {
		if (!selectedPulse) return

		if (confirmationInput !== selectedPulse.pair) {
			alert("Pulse name does not match. Please try again.")
			return
		}

		if (modalType === "delete") {
			try {
				await deleteDoc(doc(db, "pulses", selectedPulse.id))
				setPulses((prevPulses) =>
					prevPulses.filter((pulse) => pulse.id !== selectedPulse.id)
				)
				alert("Pulse deleted successfully.")
			} catch (error) {
				console.error("Error deleting pulse:", error)
				alert("Failed to delete pulse. Please try again.")
			}
		} else if (modalType === "reset") {
			// Reset logic goes here
			alert(`Pulse "${selectedPulse.pair}" reset successfully.`)
		}

		setIsConfirmationModalOpen(false)
		setSelectedPulse(null)
		setModalType(null)
	}

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
							handleClick={setIsPulseModalOpen}
							buttonText="Add Pulse"
						/>
					</Box>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Description</TableCell>
									<TableCell>Actions</TableCell>
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
											<TableCell>
												<Tooltip title="Delete">
													<IconButton
														color="error"
														onClick={() => handleActionClick(pulse, "delete")}
													>
														<DeleteIcon />
													</IconButton>
												</Tooltip>
												<Tooltip title="Reset">
													<IconButton
														color="secondary"
														onClick={() => handleActionClick(pulse, "reset")}
													>
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

			{/* Reusable Confirmation Modal */}
			<ConfirmationModal
				open={isConfirmationModalOpen}
				onClose={() => setIsConfirmationModalOpen(false)}
				onConfirm={handleActionConfirm}
				title={modalType === "delete" ? "Confirm Deletion" : "Confirm Reset"}
				message={`Type the name of the pulse ${
					selectedPulse?.pair
				} to confirm ${modalType === "delete" ? "deletion" : "reset"}.`}
				inputValue={confirmationInput}
				setInputValue={setConfirmationInput}
				placeholder="Enter pulse name"
				confirmButtonText={modalType === "delete" ? "Delete" : "Reset"}
			/>

			{/* Add Pulse Modal */}
			<AddPulseModal
				open={isPulseModalOpen}
				onClose={() => setIsPulseModalOpen(false)}
				onPulseAdded={handlePulseAdded}
			/>
		</>
	)
}

export default Dashboard
