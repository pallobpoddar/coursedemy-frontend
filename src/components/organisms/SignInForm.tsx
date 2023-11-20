import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AtomButton from "../atoms/AtomButton";
import AtomTypography from "../atoms/AtomTypography";
import AtomIconButton from "../atoms/AtomIconButton";
import MoleculeTextField from "../molecules/MoleculeTextField";
import useAuth from "../../hooks/useAuth";
import AtomAlert from "../atoms/AtomAlert";
import { saveSignin } from "../../redux/slices/authSlice";
import AtomCircularProgress from "../atoms/AtomCircularProgress";

const SignInForm = () => {
	type UserData = {
		success: boolean;
		message: string;
		data?: Object;
		errors?: string[];
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [showCircularProgress, setShowCircularProgress] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
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
			password: "",
		},
	});

	const { signin } = useAuth();

	const handlerOnSubmit = async () => {
		setShowCircularProgress(true);
		const formData = {
			email: getValues("email"),
			password: getValues("password"),
		};

		const result = await signin(formData);
		if (result.error) {
			setShowCircularProgress(false);
			setUserData(result.error.response.data);
		} else {
			setShowCircularProgress(false);
			setUserData(result);
			dispatch(saveSignin(result.data));
			navigate("/");
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}>
			<AtomTypography
				component="h1"
				variant="h4">
				Sign in
			</AtomTypography>

			{userData.message !== "" && (
				<AtomAlert
					variant="filled"
					severity="error"
					sx={{ mt: 1, width: "100%" }}>
					{userData.message}
				</AtomAlert>
			)}
			<Box
				component="form"
				sx={{ mt: 1 }}
				onSubmit={handleSubmit(handlerOnSubmit)}>
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
							label={errors.email ? errors.email.message : "Email"}
							autoComplete="email"
							autoFocus
							field={field}
							error={errors.email ? true : false}
						/>
					)}
				/>
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
							type={showPassword ? "text" : "password"}
							margin="normal"
							required
							fullWidth
							id="password"
							label={errors.password ? errors.password.message : "Password"}
							autoComplete="current-password"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<AtomIconButton
											aria-label="toggle password visibility"
											edge="end"
											onClick={() => setShowPassword(!showPassword)}
											onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
												e.preventDefault()
											}>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</AtomIconButton>
									</InputAdornment>
								),
							}}
							field={field}
							error={errors.password ? true : false}
						/>
					)}
				/>

				<AtomButton
					type="submit"
					variant="contained"
					fullWidth
					sx={{ mt: 3, mb: 2 }}>
					{showCircularProgress === true ? (
						<AtomCircularProgress
							color="inherit"
							size={25}
						/>
					) : (
						<>Sign In</>
					)}
				</AtomButton>

				<Grid container>
					<Grid
						item
						xs>
						<Link
							to="/user/forgot-password"
							style={{ color: "#1976d2" }}>
							<AtomTypography
								component="p"
								variant="body2">
								Forgot password?
							</AtomTypography>
						</Link>
					</Grid>
					<Grid item>
						<Link
							to="/user/signup"
							style={{ color: "#1976d2" }}>
							<AtomTypography
								component="p"
								variant="body2">
								Don't have an account? Sign up
							</AtomTypography>
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default SignInForm;
