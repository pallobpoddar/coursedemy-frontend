import Button from "@mui/material/Button";
import { SxProps } from "@mui/material";
import React from "react";

type Props = {
	onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
