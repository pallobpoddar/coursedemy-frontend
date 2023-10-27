import React from "react";
import { Button, SxProps } from "@mui/material";

type Props = {
	type: "button" | "submit" | "reset";
	variant: "contained" | "outlined" | "text";
	isFullWidth?: boolean;
	children: React.ReactNode;
	sx?: SxProps;
};

const AtomButton = (props: Props) => {
	return (
		<Button
			{...props}
			fullWidth={props.isFullWidth}>
			{props.children}
		</Button>
	);
};

export default AtomButton;
