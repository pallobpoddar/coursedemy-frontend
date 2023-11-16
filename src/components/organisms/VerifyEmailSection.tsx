import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AtomTypography from "../atoms/AtomTypography";
import AtomButton from "../atoms/AtomButton";
import { Link, useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const VerifyEmailSection = () => {
	const navigate = useNavigate();

	type UserData = {
		success: boolean;
		message: string;
		data?: Object;
		errors?: string[];
	};

	const [userData, setUserData] = useState<UserData>({
		success: false,
		message: "",
		data: {},
		errors: [],
	});

	const { token, id } = useParams();
	const { verifyEmail } = useAuth();

	const handlerOnSubmit = async (data: any) => {
		console.log(token, id);
		const formData = {
			token: token,
			id: id,
		};
		const result = await verifyEmail(formData);
		if (result.error) {
			setUserData(result.error.response.data);
		} else {
			setUserData(result);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				mt: 5,
			}}
		>
			<Container maxWidth="xs" sx={{ backgroundColor: "white" }}>
				<Box
					component="form"
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
					onSubmit={handlerOnSubmit}
				>
					<AtomTypography component="h1" variant="h4">
						Verify your email
					</AtomTypography>
					<AtomTypography component="p" sx={{ mt: 2 }}>
						You're almost ready to start enjoying Skillbase. Simply
						click the big blue button to verify your email address.
					</AtomTypography>
					<AtomButton
						type="submit"
						variant="contained"
						size="large"
						sx={{ mt: 2 }}
					>
						Verify
					</AtomButton>
				</Box>
			</Container>
		</Box>
	);
};

export default VerifyEmailSection;
