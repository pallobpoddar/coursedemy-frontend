import SignInForm from "../../organisms/SignInForm";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

const SignIn = () => {
	return (
		<>
			<CssBaseline />
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
