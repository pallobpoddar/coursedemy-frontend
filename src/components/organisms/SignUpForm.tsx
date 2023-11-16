import React, { useState } from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import AtomTypography from "../atoms/AtomTypography";
import MoleculeTextField from "../molecules/MoleculeTextField";
import InputAdornment from "@mui/material/InputAdornment";
import AtomIconButton from "../atoms/AtomIconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import AtomButton from "../atoms/AtomButton";
import useAuth from "../../hooks/useAuth";
import Alert from "@mui/material/Alert";

const SignUpForm = () => {
	type UserData = {
		success: boolean;
		message: string;
		data?: Object;
		errors?: string[];
	};

	const [showPassword, setShowPassword] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
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
			name: "",
			email: "",
			password: "",
		},
	});

	const { signup } = useAuth();

	const pathArray = window.location.pathname.split("/");
	const role = pathArray[1];

	const handlerOnSubmit = async (data: any) => {
		const formData = {
			name: getValues("name"),
			email: getValues("email"),
			password: getValues("password"),
			role: role,
		};
		const result = await signup(formData);
		if (result.error) {
			console.log("Error signing up: ", result.error.response.data);
			setUserData(result.error.response.data);
			setShowAlert(true);
		} else {
			setUserData(result);
			setShowAlert(true);
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
				Sign Up
			</AtomTypography>

			{showAlert && (
				<Alert
					variant="filled"
					severity={userData.success === true ? "success" : "error"}
					sx={{ mt: 1, width: "100%" }}>
					{userData.message}
				</Alert>
			)}
			<Box
				component="form"
				sx={{ mt: 1 }}
				onSubmit={handleSubmit(handlerOnSubmit)}>
				<Controller
					name="name"
					control={control}
					rules={{
						maxLength: {
							value: 255,
							message: "Character limit exceeded",
						},
					}}
					render={({ field }) => (
						<MoleculeTextField
							margin="normal"
							required
							fullWidth
							id="name"
							label={errors.name ? errors.name.message : "Full Name"}
							autoComplete="name"
							autoFocus
							field={field}
							error={errors.name ? true : false}
						/>
					)}
				/>
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
							helperText="8 characters, 1 lowercase, 1 uppercase, 1 symbol, 1 number"
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
					Sign Up
				</AtomButton>
				<Grid
					container
					justifyContent="center">
					<Grid item>
						<Link
							href="#"
							variant="body2">
							Already have an account? Sign in
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default SignUpForm;
