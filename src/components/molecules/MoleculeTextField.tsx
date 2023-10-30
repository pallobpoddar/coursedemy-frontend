import TextField from "@mui/material/TextField";
import { SxProps } from "@mui/material";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

type Props = {
	type?: string;
	variant?: "filled" | "outlined" | "standard";
	margin?: "dense" | "none" | "normal";
	required?: boolean;
	fullWidth?: boolean;
	id: string;
	label: React.ReactNode;
	autoComplete?: string;
	autoFocus?: boolean;
	InputProps?: object;
	field?:
		| ControllerRenderProps<
				{
					email: string;
					password: string;
				},
				"email"
		  >
		| ControllerRenderProps<
				{
					email: string;
					password: string;
				},
				"password"
		  >;
	error?: boolean;
	helperText?: React.ReactNode;
	sx?: SxProps;
};

const MoleculeTextField = (props: Props) => {
	const { field, ...textFieldProps } = props;

	return <TextField {...textFieldProps} {...field} />;
};

export default MoleculeTextField;
