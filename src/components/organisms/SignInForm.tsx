import React, { useState } from "react";
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

const SignInForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
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
				Sign in
			</AtomTypography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				noValidate
				sx={{ mt: 1 }}
			>
				<MoleculeTextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email"
					name="email"
					autoComplete="email"
					autoFocus
				/>
				<MoleculeTextField
					type={showPassword ? "text" : "password"}
					margin="normal"
					required
					fullWidth
					id="password"
					label="Password"
					name="password"
					autoComplete="current-password"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<AtomIconButton
									aria-label="toggle password visibility"
									edge="end"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									onMouseDown={(
										e: React.MouseEvent<HTMLButtonElement>
									) => e.preventDefault()}
								>
									{showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</AtomIconButton>
							</InputAdornment>
						),
					}}
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
					sx={{ mt: 3, mb: 2 }}
				>
					Sign In
				</AtomButton>

				<Grid container>
					<Grid item xs>
						<Link href="#" variant="body2">
							Forgot password?
						</Link>
					</Grid>
					<Grid item>
						<Link href="#" variant="body2">
							Don't have an account? Sign Up
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default SignInForm;
