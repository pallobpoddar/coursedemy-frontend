import Checkbox from "@mui/material/Checkbox";
import { SxProps } from "@mui/material";
import React from "react";

type Props = {
	id: string;
	name: string;
	value: any;
	color?:
		| "default"
		| "primary"
		| "secondary"
		| "error"
		| "info"
		| "success"
		| "warning";
	sx?: SxProps;
};

const AtomCheckbox = (props: Props) => {
	return <Checkbox {...props} />;
};

export default AtomCheckbox;
