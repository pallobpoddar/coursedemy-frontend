import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AtomButton from "../atoms/AtomButton";
import AtomTypography from "../atoms/AtomTypography";
import MoleculeTextField from "../molecules/MoleculeTextField";
import AtomCheckbox from "../atoms/AtomCheckbox";
import MoleculeFormControlLabel from "../molecules/MoleculeFormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AtomIconButton from "../atoms/AtomIconButton";
import { useForm, Controller } from "react-hook-form";

const SignInForm = () => {
	const [showPassword, setShowPassword] = useState(false);

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

	const handlerOnSubmit = (data: any) => {
		const formData = {
			email: getValues("email"),
			password: getValues("password"),
		};
		console.log(formData);
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
			<Box
				component="form"
				sx={{ mt: 1 }}
				onSubmit={handleSubmit(handlerOnSubmit)}>
				<Controller
					name="email"
					control={control}
					rules={{
						maxLength: {
							value: 64,
							message: "Email is not valid",
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
						maxLength: {
							value: 20,
							message: "Password is not valid",
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
				<MoleculeFormControlLabel
					control={
						<AtomCheckbox
							id="remember-me"
							name="remember-me"
							value="remember"
						/>
					}
					label="Remember me"
				/>
				<AtomButton
					type="submit"
					variant="contained"
					fullWidth
					sx={{ mt: 3, mb: 2 }}>
					Sign In
				</AtomButton>

				<Grid container>
					<Grid
						item
						xs>
						<Link
							href="#"
							variant="body2">
							Forgot password?
						</Link>
					</Grid>
					<Grid item>
						<Link
							href="#"
							variant="body2">
							Don't have an account? Sign up
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default SignInForm;
