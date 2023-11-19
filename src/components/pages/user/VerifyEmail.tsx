import React from "react";
import VerifyEmailSection from "../../organisms/VerifyEmailSection";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const VerifyEmail = () => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				minHeight: "100vh",
			}}
		>
			<Container component="main" maxWidth="xs">
				<VerifyEmailSection />
			</Container>
		</Box>
	);
};

export default VerifyEmail;
