import { useState } from "react";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import AtomButton from "../atoms/AtomButton";
import AtomTypography from "../atoms/AtomTypography";
import MoleculeTextField from "../molecules/MoleculeTextField";
import useAuth from "../../hooks/useAuth";
import AtomAlert from "../atoms/AtomAlert";
import AtomCircularProgress from "../atoms/AtomCircularProgress";
import { useDispatch } from "react-redux";
import { saveSignin } from "../../redux/slices/authSlice";

const ResetPasswordForm = () => {
	type UserData = {
		success: boolean;
		message: string;
		data?: Object;
		errors?: string[];
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();

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
		watch,
	} = useForm({
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const { resetPassword } = useAuth();
	const { token, id } = useParams();

	const handlerOnSubmit = async () => {
		setShowCircularProgress(true);
		const formData = {
			token: token,
			id: id,
			password: getValues("password"),
			confirmPassword: getValues("confirmPassword"),
		};

		const result = await resetPassword(formData);
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
			<AtomTypography component="h1" variant="h4">
				Reset Password
			</AtomTypography>

			{userData.message !== "" && (
				<AtomAlert
					variant="filled"
					severity="error"
					sx={{ mt: 1, width: "100%" }}
				>
					{userData.message}
				</AtomAlert>
			)}
			<Box
				component="form"
				sx={{ mt: 1 }}
				onSubmit={handleSubmit(handlerOnSubmit)}
			>
				<Controller
					name="password"
					control={control}
					rules={{
						minLength: {
							value: 8,
							message: "Invalid password",
						},
						maxLength: {
							value: 20,
							message: "Character limit exceeded",
						},
					}}
					render={({ field }) => (
						<MoleculeTextField
							type="password"
							margin="normal"
							required
							fullWidth
							id="password"
							label={
								errors.password
									? errors.password.message
									: "Password"
							}
							autoComplete="current-password"
							field={field}
							error={errors.password ? true : false}
						/>
					)}
				/>

				<Controller
					name="confirmPassword"
					control={control}
					rules={{
						minLength: {
							value: 8,
							message: "Invalid password",
						},
						maxLength: {
							value: 20,
							message: "Character limit exceeded",
						},
						validate: (value) =>
							value === watch("password") ||
							"Passwords do not match",
					}}
					render={({ field }) => (
						<MoleculeTextField
							type="password"
							margin="normal"
							required
							fullWidth
							id="confirmPassword"
							label={
								errors.confirmPassword
									? errors.confirmPassword.message
									: "Confirm Password"
							}
							autoComplete="current-password"
							field={field}
							error={errors.confirmPassword ? true : false}
						/>
					)}
				/>

				<AtomButton
					type="submit"
					variant="contained"
					fullWidth
					sx={{ mt: 3, mb: 2 }}
				>
					{showCircularProgress ? (
						<AtomCircularProgress color="inherit" size={25} />
					) : (
						<>Submit</>
					)}
				</AtomButton>
			</Box>
		</Box>
	);
};

export default ResetPasswordForm;
