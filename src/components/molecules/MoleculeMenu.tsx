import React from "react";
import Menu from "@mui/material/Menu";

type Props = {
	anchorEl?: HTMLElement | null;
	anchorOrigin: {
		horizontal: "center" | "left" | "right" | number;
		vertical: "bottom" | "center" | "top" | number;
	};
	id?: string;
	keepMounted?: boolean;
	transformOrigin: {
		horizontal: "center" | "left" | "right" | number;
		vertical: "bottom" | "center" | "top" | number;
	};
	open: boolean;
	onClose?: () => void;
	children: React.ReactNode;
};

const MoleculeMenu = (props: Props) => {
	return <Menu {...props}>{props.children}</Menu>;
};

export default MoleculeMenu;
