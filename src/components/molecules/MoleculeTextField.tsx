import TextField from "@mui/material/TextField";
import { SxProps } from "@mui/material";
import React from "react";

type Props = {
	type?: string;
	variant?: "filled" | "outlined" | "standard";
	margin?: "dense" | "none" | "normal";
	required?: boolean;
	fullWidth?: boolean;
	id: string;
	label: React.ReactNode;
	name: string;
	autoComplete?: string;
	autoFocus?: boolean;
	InputProps?: object;
	sx?: SxProps;
};

const MoleculeTextField = (props: Props) => {
	return <TextField {...props} />;
};

export default MoleculeTextField;
