import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { SxProps } from "@mui/material";

type Props = {
	onChange?: (event: any) => void;
	type?: string;
	variant?: "filled" | "outlined" | "standard";
	margin?: "dense" | "none" | "normal";
	required?: boolean;
	fullWidth?: boolean;
	id: string;
	defaultValue?: any;
	placeholder?: string;
	label?: React.ReactNode;
	autoComplete?: string;
	autoFocus?: boolean;
	InputProps?: object;
	field?:
		| ControllerRenderProps<
				{
					name: string;
				},
				"name"
		  >
		| ControllerRenderProps<
				{
					email: string;
				},
				"email"
		  >
		| ControllerRenderProps<
				{
					password: string;
				},
				"password"
		  >
		| ControllerRenderProps<
				{
					confirmPassword: string;
				},
				"confirmPassword"
		  >
		| ControllerRenderProps<
				{
					title: string;
				},
				"title"
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
