import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import MoleculeTextField from "../molecules/MoleculeTextField";
import Categories from "../molecules/Categories";
import AtomTypography from "../atoms/AtomTypography";
import AtomButton from "../atoms/AtomButton";
import AtomCircularProgress from "../atoms/AtomCircularProgress";
import useCourse from "../../hooks/useCourse";
import { useSelector } from "react-redux";
import { IAuthStateProp } from "../../interfaces/stateInterface";
import AtomAlert from "../atoms/AtomAlert";

const CourseCreationForm = () => {
	type CourseData = {
		success: boolean;
		message: string;
		data?: Object;
		errors?: string[];
	};

	type Category = string | null;

	const [category, setCategory] = useState<Category>("");
	const [showCircularProgress, setShowCircularProgress] = useState(false);
	const [courseData, setCourseData] = useState<CourseData>({
		success: false,
		message: "",
		data: {},
		errors: [],
	});

	const { createCourse } = useCourse();
	const navigate = useNavigate();

	const instructorReference = useSelector(
		(state: IAuthStateProp) => state.auth.instructorReference?._id
	);

	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
	} = useForm({
		mode: "onChange",
		defaultValues: {
			title: "",
		},
	});

	const handleUpdate = async (category: string | null) => {
		setCategory(category);
	};

	const handlerOnSubmit = async () => {
		setShowCircularProgress(true);
		const formData = {
			instructorReference: instructorReference,
			title: getValues("title"),
			categoryReference: category,
		};

		const result = await createCourse(formData);
		if (result.error) {
			setShowCircularProgress(false);
			setCourseData(result.error.response.data);
		} else {
			setShowCircularProgress(false);
			setCourseData(result);
			navigate("/instructor/dashboard");
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(handlerOnSubmit)}>
			{courseData.message !== "" && (
				<AtomAlert
					variant="filled"
					severity="error"
					sx={{ mt: 1, width: "100%" }}>
					{courseData.message}
				</AtomAlert>
			)}
			<AtomTypography
				component="h2"
				variant="h5"
				sx={{ mb: 2 }}>
				How about a working title?
			</AtomTypography>
			<AtomTypography
				component="p"
				variant="body1"
				sx={{ mb: 4 }}>
				It's ok if you can't think of a good title now. You can change it later.
			</AtomTypography>
			<Controller
				name="title"
				control={control}
				rules={{
					maxLength: {
						value: 100,
						message: "Character limit exceeded",
					},
				}}
				render={({ field }) => (
					<MoleculeTextField
						margin="normal"
						required
						fullWidth
						id="title"
						label={errors.title ? errors.title.message : "Title"}
						autoComplete="title"
						field={field}
						error={errors.title ? true : false}
						sx={{ mb: 4 }}
					/>
				)}
			/>

			<AtomTypography
				component="h2"
				variant="h5"
				sx={{ mb: 2 }}>
				What category best fits the knowledge you'll share?
			</AtomTypography>
			<AtomTypography
				component="p"
				variant="body1"
				sx={{ mb: 4 }}>
				If you're not sure about the right category, you can change it later.
			</AtomTypography>
			<Categories onUpdate={handleUpdate} />
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
					<>Create Course</>
				)}
			</AtomButton>
		</Box>
	);
};

export default CourseCreationForm;
