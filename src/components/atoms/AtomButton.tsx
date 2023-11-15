import Button from "@mui/material/Button";
import { SxProps } from "@mui/material";
import React from "react";

type Props = {
	type?: "button" | "submit" | "reset";
	variant?: "contained" | "outlined" | "text";
	fullWidth?: boolean;
	children: React.ReactNode;
	color?: any;
	size?: "small" | "medium" | "large";
	sx?: SxProps;
};

const AtomButton = (props: Props) => {
	return <Button {...props}>{props.children}</Button>;
};

export default AtomButton;
