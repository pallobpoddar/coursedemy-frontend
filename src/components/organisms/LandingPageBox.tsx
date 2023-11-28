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
import Input from "@mui/material/Input";

const LandingPageBox = () => {
	const { courseReference } = useParams();
	const {
		getOneByCourseReference,
		updateOneById,
		uploadThumbnail,
		uploadPromoVideo,
	} = useCourse();

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
	const [category, setCategory] = useState<String | null>("");
	const [showSaveCircularProgress, setShowSaveCircularProgress] =
		useState(false);
	const [showThumbnailCircularProgress, setShowThumbnailCircularProgress] =
		useState(false);
	const [showPromoVideoCircularProgress, setShowPromoVideoCircularProgress] =
		useState(false);
	const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(
		null
	);
	const [selectedPromoVideo, setSelectedPromoVideo] = useState<File | null>(
		null
	);

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

	const handleUpdate = async (category: string | null) => {
		setCategory(category);
	};

	const handlerOnSubmit = async () => {
		setShowSaveCircularProgress(true);
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
			setShowSaveCircularProgress(false);
			setResponse(result.error.response.data);
		} else {
			setShowSaveCircularProgress(false);
			setResponse(result);
		}
	};

	const handleThumbnailChange = (event: any) => {
		const file = event.target.files[0];
		setSelectedThumbnail(file);
	};

	const handleThumbnailSave = async () => {
		setShowThumbnailCircularProgress(true);

		const data = {
			courseReference: courseReference,
			thumbnail: selectedThumbnail,
		};
		const result = await uploadThumbnail(data);
		if (result.error) {
			setShowThumbnailCircularProgress(false);
			setResponse(result.error.response.data);
		} else {
			setShowThumbnailCircularProgress(false);
			setResponse(result);
		}
	};

	const handlePromoVideoChange = (event: any) => {
		const file = event.target.files[0];
		setSelectedPromoVideo(file);
	};

	const handlePromoVideoSave = async () => {
		setShowPromoVideoCircularProgress(true);

		const data = {
			courseReference: courseReference,
			promoVideo: selectedPromoVideo,
		};
		const result = await uploadPromoVideo(data);
		if (result.error) {
			setShowPromoVideoCircularProgress(false);
			setResponse(result.error.response.data);
		} else {
			setShowPromoVideoCircularProgress(false);
			setResponse(result);
		}
	};

	return (
		<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
			<Toolbar />
			<Paper
				elevation={3}
				sx={{
					width: "100%",
					minHeight: "100vh",
				}}
			>
				<Box
					sx={{
						width: "100%",
						height: "100px",
						border: "0.5px solid #e5e5e5",
						paddingLeft: "40px",
						display: "flex",
						alignItems: "center",
					}}
				>
					<AtomTypography component="h1" variant="h5">
						Course Landing Page
					</AtomTypography>
				</Box>

				<Box
					p={3}
					display="flex"
					flexDirection="column"
					gap="30px"
					pl={5}
					pr={5}
				>
					<AtomTypography component="p" variant="body1">
						Your course landing page is crucial to your success on
						Coursedemy. If it's done right, it can also help you
						gain visibility in search engines like Google. As you
						complete this section, think about creating a compelling
						Course Landing Page that demonstrates why someone would
						want to enroll in your course. Learn more about creating
						your course landing page and course title standards.
					</AtomTypography>
				</Box>
				{response.message !== "" && (
					<AtomAlert
						variant="filled"
						severity={
							response.success === true ? "success" : "error"
						}
						sx={{ mt: 1, width: "100%" }}
					>
						{response.message}
					</AtomAlert>
				)}
				{courseData.title !== "" && (
					<Box
						component="form"
						onSubmit={handleSubmit(handlerOnSubmit)}
						pl={5}
						pr={5}
					>
						<AtomTypography
							component="p"
							variant="body1"
							sx={{
								width: "10%",
								mt: 3,
								ml: 1,
							}}
						>
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
									placeholder="Title"
									fullWidth
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
							}}
						>
							<strong>Category</strong>
						</AtomTypography>
						<Categories onUpdate={handleUpdate} />
						<AtomTypography
							component="p"
							variant="body1"
							sx={{
								width: "10%",
								mt: 3,
								ml: 1,
							}}
						>
							<strong>Course image</strong>
						</AtomTypography>
						<Box
							mt={2}
							display="flex"
							alignItems="center"
							justifyContent="space-between"
							border="0.5px solid gray"
							p={1}
						>
							<Box paddingLeft={2}>
								<AtomTypography component="p" variant="body1">
									{selectedThumbnail
										? selectedThumbnail.name
										: "No file selected"}
								</AtomTypography>
							</Box>

							<Box display="flex">
								<Box
									borderLeft="0.5px solid gray"
									mr={1}
									sx={{
										"&:hover": {
											bgcolor: "#d2d5d8",
										},
									}}
								>
									<label htmlFor="thumbnail">
										<AtomButton
											variant="text"
											color="inherit"
											component="span"
										>
											Select file
											<Input
												id="thumbnail"
												type="file"
												style={{
													display: "none",
												}}
												onChange={handleThumbnailChange}
											/>
										</AtomButton>
									</label>
								</Box>
								<Box>
									<AtomButton
										variant="contained"
										disabled={
											selectedThumbnail ? false : true
										}
										onClick={() => handleThumbnailSave()}
										sx={{
											mr: 5,
											ml: 2,
										}}
									>
										{showThumbnailCircularProgress ===
										true ? (
											<AtomCircularProgress
												color="inherit"
												size={25}
											/>
										) : (
											<>Upload</>
										)}
									</AtomButton>
								</Box>
							</Box>
						</Box>

						<AtomTypography
							component="p"
							variant="body1"
							sx={{
								width: "10%",
								mt: 3,
								ml: 1,
							}}
						>
							<strong>Promotional video</strong>
						</AtomTypography>
						<Box
							mt={2}
							display="flex"
							alignItems="center"
							justifyContent="space-between"
							border="0.5px solid gray"
							p={1}
						>
							<Box paddingLeft={2}>
								<AtomTypography component="p" variant="body1">
									{selectedPromoVideo
										? selectedPromoVideo.name
										: "No file selected"}
								</AtomTypography>
							</Box>

							<Box display="flex">
								<Box
									borderLeft="0.5px solid gray"
									mr={1}
									sx={{
										"&:hover": {
											bgcolor: "#d2d5d8",
										},
									}}
								>
									<label htmlFor="promotional-video">
										<AtomButton
											variant="text"
											color="inherit"
											component="span"
										>
											Select file
											<Input
												id="promotional-video"
												type="file"
												style={{
													display: "none",
												}}
												onChange={
													handlePromoVideoChange
												}
											/>
										</AtomButton>
									</label>
								</Box>
								<Box>
									<AtomButton
										variant="contained"
										disabled={
											selectedPromoVideo ? false : true
										}
										onClick={() => handlePromoVideoSave()}
										sx={{
											mr: 5,
											ml: 2,
										}}
									>
										{showPromoVideoCircularProgress ===
										true ? (
											<AtomCircularProgress
												color="inherit"
												size={25}
											/>
										) : (
											<>Upload</>
										)}
									</AtomButton>
								</Box>
							</Box>
						</Box>

						<AtomButton
							type="submit"
							variant="contained"
							fullWidth
							sx={{ mt: 3, mb: 2 }}
						>
							{showSaveCircularProgress === true ? (
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
