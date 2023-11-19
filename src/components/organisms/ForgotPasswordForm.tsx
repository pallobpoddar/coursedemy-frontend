import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Box from "@mui/material/Box";
import AtomTypography from "../atoms/AtomTypography";
import AtomAlert from "../atoms/AtomAlert";
import MoleculeTextField from "../molecules/MoleculeTextField";
import AtomButton from "../atoms/AtomButton";
import AtomCircularProgress from "../atoms/AtomCircularProgress";

const ForgotPasswordForm = () => {
	type UserData = {
		success: boolean;
		message: string;
		data?: Object;
		errors?: string[];
	};

	const [showCircularProgress, setShowCircularProgress] = useState(false);
	const [userData, setUserData] = useState<UserData>({
		success: false,
		message: "",
		data: {},
		errors: [],
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
	} = useForm({
		mode: "onChange",
		defaultValues: {
			email: "",
		},
	});

	const { forgotPasswordEmail } = useAuth();

	const handlerOnSubmit = async () => {
		setShowCircularProgress(true);
		const formData = {
			email: getValues("email"),
		};

		const result = await forgotPasswordEmail(formData);
		if (result.error) {
			setShowCircularProgress(false);
			setUserData(result.error.response.data);
		} else {
			setShowCircularProgress(false);
			setUserData(result);
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
			<AtomTypography component="h1" variant="h4">
				Forgot Password
			</AtomTypography>

			{userData.message !== "" && (
				<AtomAlert
					variant="filled"
					severity={userData.success === true ? "success" : "error"}
					sx={{ mt: 1, width: "100%" }}
				>
					{userData.message}
				</AtomAlert>
			)}
			<Box
				component="form"
				sx={{ mt: 1, width: "100%" }}
				onSubmit={handleSubmit(handlerOnSubmit)}
			>
				<Controller
					name="email"
					control={control}
					rules={{
						maxLength: {
							value: 320,
							message: "Invalid email",
						},
					}}
					render={({ field }) => (
						<MoleculeTextField
							margin="normal"
							required
							fullWidth
							id="email"
							label={
								errors.email ? errors.email.message : "Email"
							}
							autoComplete="email"
							autoFocus
							field={field}
							error={errors.email ? true : false}
						/>
					)}
				/>

				<AtomButton
					type="submit"
					variant="contained"
					fullWidth
					sx={{ mt: 3, mb: 2 }}
				>
					{showCircularProgress === true ? (
						<AtomCircularProgress color="inherit" size={25} />
					) : (
						<>Reset Password</>
					)}
				</AtomButton>
			</Box>
		</Box>
	);
};

export default ForgotPasswordForm;
