import React from "react";
import SignUpForm from "../../organisms/SignUpForm";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const SignUp = () => {
	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					minHeight: "100vh",
				}}
			>
				<Container component="main" maxWidth="xs">
					<SignUpForm />
				</Container>
			</Box>
		</>
	);
};

export default SignUp;
