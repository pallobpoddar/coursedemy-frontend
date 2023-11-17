import { SxProps } from "@mui/material";
import Alert from "@mui/material/Alert";
import React from "react";

type Props = {
	variant: "filled" | "outlined" | "standard";
	severity: "error" | "info" | "success" | "warning";
	children: React.ReactNode;
	sx?: SxProps;
};

const AtomAlert = (props: Props) => {
	return <Alert {...props}>{props.children}</Alert>;
};

export default AtomAlert;
