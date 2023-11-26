import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AtomButton from "../atoms/AtomButton";

type Props = {
	open: boolean;
	onClose: () => void;
	onOKButtonClick: () => void;
};

const MoleculeAlertDialog = (props: Props) => {
	return (
		<>
			<Dialog
				open={props.open}
				onClose={props.onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Please confirm
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						You are about to remove a curriculum item. Are you sure
						you want to continue?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<AtomButton onClick={props.onClose}>Cancel</AtomButton>
					<AtomButton onClick={props.onOKButtonClick} autoFocus>
						OK
					</AtomButton>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default MoleculeAlertDialog;
