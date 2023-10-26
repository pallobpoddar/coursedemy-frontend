// import React from "react";
import Button from "@mui/material/Button";

type Props = {
	type: "button" | "submit" | "reset";
	variant: "text" | "outlined" | "contained";
};

const PrimaryButton = (props: Props) => {
	return (
		<Button
			type={props.type}
			fullWidth
			variant={props.variant}
			sx={{ mt: 3, mb: 2 }}
		>
			Sign In
		</Button>
	);
};

export default PrimaryButton;
