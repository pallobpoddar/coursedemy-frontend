import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ForgotPasswordForm from "../../organisms/ForgotPasswordForm";

const ForgotPassword = () => {
	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					minHeight: "100vh",
				}}>
				<Container
					component="main"
					maxWidth="xs">
					<ForgotPasswordForm />
				</Container>
			</Box>
		</>
	);
};

export default ForgotPassword;
