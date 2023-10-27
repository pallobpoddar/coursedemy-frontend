import { Typography } from "@mui/material";
import React from "react";

type Props = {
	component: React.ElementType;
	variant:
		| "body1"
		| "body2"
		| "button"
		| "caption"
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "h6"
		| "inherit"
		| "overline"
		| "subtitle1"
		| "subtitle2";
	children: React.ReactNode;
};

const AtomLabel = (props: Props) => {
	return <Typography {...props}>{props.children}</Typography>;
};

export default AtomLabel;
