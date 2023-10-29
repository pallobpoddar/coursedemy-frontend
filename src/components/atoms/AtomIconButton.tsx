import IconButton from "@mui/material/IconButton";
import { SxProps } from "@mui/material";
import React from "react";

type Props = {
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
	edge?: "end" | "start" | false;
	children: React.ReactNode;
	sx?: SxProps;
};

const AtomIconButton = (props: Props) => {
	return <IconButton {...props}>{props.children}</IconButton>;
};

export default AtomIconButton;
