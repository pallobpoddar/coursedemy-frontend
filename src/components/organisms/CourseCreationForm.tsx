import { useNavigate } from "react-router-dom";
import AtomTypography from "../atoms/AtomTypography";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import MoleculeTextField from "../molecules/MoleculeTextField";

const CourseCreationForm = () => {
	type UserData = {
		success: boolean;
		message: string;
		data?: Object;
		errors?: string[];
	};

	const navigate = useNavigate();

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
			title: "",
			category: "",
		},
	});

	return (
		<>
			<AtomTypography component="h2" variant="h4" sx={{ mb: 2 }}>
				How about a working title?
			</AtomTypography>
			<AtomTypography component="p" variant="body1" sx={{ mb: 4 }}>
				It's ok if you can't think of a good title now. You can change
				it later.
			</AtomTypography>

			<Box
				component="form"
				// onSubmit={handleSubmit(handlerOnSubmit)}
			>
				<Controller
					name="title"
					control={control}
					rules={{
						maxLength: {
							value: 100,
							message: "Invalid title",
						},
					}}
					render={({ field }) => (
						<MoleculeTextField
							margin="normal"
							required
							fullWidth
							id="title"
							label={
								errors.title ? errors.title.message : "Title"
							}
							autoComplete="tile"
							field={field}
							error={errors.title ? true : false}
							sx={{ mb: 4 }}
						/>
					)}
				/>

				<AtomTypography component="h2" variant="h4">
					How about a working title?
				</AtomTypography>
				<AtomTypography component="p" variant="body1">
					It's ok if you can't think of a good title now. You can
					change it later.
				</AtomTypography>
			</Box>
		</>
	);
};

export default CourseCreationForm;
