import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

type Props = {
	color:
		| "inherit"
		| "primary"
		| "secondary"
		| "error"
		| "info"
		| "success"
		| "warning";
};

const AtomCircularProgress = (props: Props) => {
	return <CircularProgress {...props}></CircularProgress>;
};

export default AtomCircularProgress;
