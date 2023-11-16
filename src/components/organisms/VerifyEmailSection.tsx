import Container from "@mui/material/Container";
import React from "react";
import AtomTypography from "../atoms/AtomTypography";
import AtomButton from "../atoms/AtomButton";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Home from "../pages/user/Home";

const VerifyEmailSection = () => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				mt: 5,
			}}>
			<Container
				maxWidth="xs"
				sx={{ backgroundColor: "white" }}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<AtomTypography
						component="h1"
						variant="h4">
						Verify your email
					</AtomTypography>
					<AtomTypography
						component="body"
						sx={{ mt: 2 }}>
						You're almost ready to start enjoying Skillbase. Simply click the
						big blue button to verify your email address.
					</AtomTypography>
					<Link to={"/"}>
						<AtomButton
							variant="contained"
							size="large"
							sx={{ mt: 2 }}>
							Verify
						</AtomButton>
					</Link>
				</Box>
			</Container>
		</Box>
	);
};

export default VerifyEmailSection;
