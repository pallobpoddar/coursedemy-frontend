import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import AtomButton from "../atoms/AtomButton";
import MoleculeAlertDialog from "../molecules/MoleculeAlertDialog";
import useAssignment from "../../hooks/useAssignment";

const AssignmentDeleteButton = () => {
	const navigate = useNavigate();
	const { courseReference, assignment } = useParams();
	const [isAlertDialogVisible, setIsAlertDialogVisible] = useState(false);

	const { deleteOneById } = useAssignment();

	const handleAlertDialogClose = () => {
		setIsAlertDialogVisible(false);
	};

	const handleAlertDialogOKButtonOnClick = async () => {
		const result = await deleteOneById(assignment);
		if (result.error) {
			setIsAlertDialogVisible(false);
		} else {
			setIsAlertDialogVisible(false);
			navigate(`/instructor/course/${courseReference}/assignments`);
		}
	};

	return (
		<>
			<Box display="flex" justifyContent="flex-end">
				<AtomButton
					color="error"
					variant="contained"
					onClick={() => setIsAlertDialogVisible(true)}
					sx={{
						mt: "10%",
						mr: "20%",
					}}
				>
					Delete
				</AtomButton>
			</Box>
			<MoleculeAlertDialog
				open={isAlertDialogVisible}
				onClose={handleAlertDialogClose}
				onOKButtonClick={() => handleAlertDialogOKButtonOnClick()}
			/>
		</>
	);
};

export default AssignmentDeleteButton;
