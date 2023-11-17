import React from "react";
import ResetPasswordForm from "../../organisms/ResetPasswordForm";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const ResetPassword = () => {
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
					<ResetPasswordForm />
				</Container>
			</Box>
		</>
	);
};

export default ResetPassword;
