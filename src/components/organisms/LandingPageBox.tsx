import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AtomTypography from "../atoms/AtomTypography";
import Paper from "@mui/material/Paper";
import MoleculeTextField from "../molecules/MoleculeTextField";
import useCourse from "../../hooks/useCourse";
import { Course } from "../../interfaces/courseInterface";
import { Controller, useForm } from "react-hook-form";
import Categories from "../molecules/Categories";
import AtomAlert from "../atoms/AtomAlert";
import AtomButton from "../atoms/AtomButton";
import AtomCircularProgress from "../atoms/AtomCircularProgress";

const LandingPageBox = () => {
	const { courseReference } = useParams();
	const { getOneByCourseReference, updateOneById } = useCourse();

	type Response = {
		success: boolean;
		message: string;
		data?: Object;
		errors?: string[];
	};

	const [courseData, setCourseData] = useState<Course>({
		_id: "",
		instructorReference: "",
		title: "",
		isApproved: false,
		categoryReference: "",
		thumbnail: "",
		promoVideo: "",
	});
	const [response, setResponse] = useState<Response>({
		success: false,
		message: "",
		data: {},
		errors: [],
	});
	const [courseTitle, setCourseTitle] = useState<String>("");
	const [category, setCategory] = useState<String | null>("");
	const [showCircularProgress, setShowCircularProgress] = useState(false);

	useEffect(() => {
		const getSectionsFromApi = async () => {
			try {
				const result = await getOneByCourseReference(courseReference);
				setCourseData(result.data);
			} catch (error) {
				console.error("Error setting data:", error);
			}
		};

		getSectionsFromApi();
	}, []);

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

	const handleCourseTitleChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCourseTitle(event.target.value);
	};

	const handleUpdate = async (category: string | null) => {
		setCategory(category);
	};

	const handlerOnSubmit = async () => {
		setShowCircularProgress(true);
		const formData = {
			courseReference: courseReference,
			title: getValues("title"),
			categoryReference: category,
		};

		const filteredFormData = Object.fromEntries(
			Object.entries(formData).filter(
				([_, value]) => value !== null && value !== ""
			)
		);

		const result = await updateOneById(filteredFormData);
		if (result.error) {
			setShowCircularProgress(false);
			setResponse(result.error.response.data);
		} else {
			setShowCircularProgress(false);
			setResponse(result);
		}
	};

	return (
		<Box
			component="main"
			sx={{ flexGrow: 1, p: 3 }}>
			<Toolbar />
			<Paper
				elevation={3}
				sx={{
					width: "100%",
					minHeight: "100vh",
				}}>
				<Box
					sx={{
						width: "100%",
						height: "100px",
						border: "0.5px solid #e5e5e5",
						paddingLeft: "40px",
						display: "flex",
						alignItems: "center",
					}}>
					<AtomTypography
						component="h1"
						variant="h5">
						Course Landing Page
					</AtomTypography>
				</Box>

				<Box
					p={3}
					display="flex"
					flexDirection="column"
					gap="30px"
					pl={5}
					pr={5}>
					<AtomTypography
						component="p"
						variant="body1">
						Your course landing page is crucial to your success on Coursedemy.
						If it's done right, it can also help you gain visibility in search
						engines like Google. As you complete this section, think about
						creating a compelling Course Landing Page that demonstrates why
						someone would want to enroll in your course. Learn more about
						creating your course landing page and course title standards.
					</AtomTypography>
				</Box>
				{response.message !== "" && (
					<AtomAlert
						variant="filled"
						severity={response.success === true ? "success" : "error"}
						sx={{ mt: 1, width: "100%" }}>
						{response.message}
					</AtomAlert>
				)}
				{courseData.title !== "" && (
					<Box
						component="form"
						onSubmit={handleSubmit(handlerOnSubmit)}
						pl={5}
						pr={5}>
						<AtomTypography
							component="p"
							variant="body1"
							sx={{
								width: "10%",
								mt: 3,
								ml: 1,
							}}>
							<strong>Course title</strong>
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
									id="course-title-edit"
									variant="outlined"
									fullWidth
									onChange={handleCourseTitleChange}
									field={field}
									error={errors.title ? true : false}
									sx={{
										mr: 1,
										mb: 2,
									}}
								/>
							)}
						/>
						<AtomTypography
							component="p"
							variant="body1"
							sx={{
								width: "10%",
								mt: 3,
								ml: 1,
							}}>
							<strong>Category</strong>
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
								<>Save</>
							)}
						</AtomButton>
					</Box>
				)}
			</Paper>
		</Box>
	);
};

export default LandingPageBox;
