import SignInForm from "../../organisms/SignInForm";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const SignIn = () => {
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
					<SignInForm />
				</Container>
			</Box>
		</>
	);
};

export default SignIn;
