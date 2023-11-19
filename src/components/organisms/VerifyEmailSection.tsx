import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AtomTypography from "../atoms/AtomTypography";
import AtomButton from "../atoms/AtomButton";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AtomAlert from "../atoms/AtomAlert";
import AtomCircularProgress from "../atoms/AtomCircularProgress";
import { useDispatch } from "react-redux";
import { saveSignin } from "../../redux/slices/authSlice";

const VerifyEmailSection = () => {
	type UserData = {
		success: boolean;
		message: string;
		data?: Object;
		errors?: string[];
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [showCircularProgress, setShowCircularProgress] = useState(false);
	const [userData, setUserData] = useState<UserData>({
		success: false,
		message: "",
		data: {},
		errors: [],
	});

	const { verifyEmail } = useAuth();
	const { token, id } = useParams();

	const handlerOnSubmit = async (e: any) => {
		e.preventDefault();
		setShowCircularProgress(true);
		const formData = {
			token: token,
			id: id,
		};
		const result = await verifyEmail(formData);
		if (result.error) {
			setShowCircularProgress(false);
			setUserData(result.error.response.data);
		} else {
			setShowCircularProgress(false);
			setUserData(result);
			dispatch(saveSignin(result));
			navigate("/");
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
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
					{userData.message !== "" && (
						<AtomAlert
							variant="filled"
							severity="error"
							sx={{ mb: 2, width: "100%" }}
						>
							{userData.message}
						</AtomAlert>
					)}
					<AtomTypography component="h1" variant="h4">
						Verify your email
					</AtomTypography>
					<AtomTypography component="p" sx={{ mt: 2 }}>
						You're almost ready to start enjoying Coursedemy. Simply
						click the button to verify your email.
					</AtomTypography>
					<AtomButton
						type="submit"
						variant="contained"
						size="large"
						fullWidth
						sx={{ mt: 2 }}
					>
						{showCircularProgress === true ? (
							<AtomCircularProgress color="inherit" size={25} />
						) : (
							<>Verify</>
						)}
					</AtomButton>
				</Box>
			</Container>
		</Box>
	);
};

export default VerifyEmailSection;
