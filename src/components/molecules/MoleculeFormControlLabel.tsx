import FormControlLabel from "@mui/material/FormControlLabel";
import { SxProps } from "@mui/material";
import React from "react";

type Props = {
	control: React.ReactElement;
	label: React.ReactNode;
	sx?: SxProps;
};

const MoleculeFormControlLabel = (props: Props) => {
	return <FormControlLabel {...props} />;
};

export default MoleculeFormControlLabel;
