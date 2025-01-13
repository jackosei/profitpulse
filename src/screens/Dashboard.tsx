import React, { useState, useEffect } from "react"
import { db } from "../firebaseConfig"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"
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
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import RefreshIcon from "@mui/icons-material/Refresh"
import ConfirmationModal from "../components/ConfirmationModal"

interface Pulse {
	id: string
	description: string
	pair: string
}

const Dashboard: React.FC = () => {
	const [pulses, setPulses] = useState<Pulse[]>([])
	const [selectedPulse, setSelectedPulse] = useState<Pulse | null>(null)
	const [confirmationInput, setConfirmationInput] = useState("")
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalType, setModalType] = useState<"delete" | "reset" | null>(null)

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
			} catch (error) {
				console.error("Error fetching pulses:", error)
			}
		}

		fetchPulses()
	}, [])

	const handleActionClick = (pulse: Pulse, action: "delete" | "reset") => {
		setSelectedPulse(pulse)
		setConfirmationInput("")
		setModalType(action)
		setIsModalOpen(true)
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

		setIsModalOpen(false)
		setSelectedPulse(null)
		setModalType(null)
	}

	return (
		<>
			<Typography variant="h5" gutterBottom>
				Pulses
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
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
				</Table>
			</TableContainer>

			{/* Reusable Confirmation Modal */}
			<ConfirmationModal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
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
		</>
	)
}

export default Dashboard
