import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Input from "@mui/material/Input";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AtomTypography from "../atoms/AtomTypography";
import useSection from "../../hooks/useSection";
import useLecture from "../../hooks/useLecture";
import AtomButton from "../atoms/AtomButton";
import AtomCircularProgress from "../atoms/AtomCircularProgress";
import AtomIconButton from "../atoms/AtomIconButton";

const CourseCurriculum = () => {
	type Lecture = {
		_id: string;
		title: string;
		content: string;
		isAccessibleToUnsubscribedLearners: boolean;
	};

	type Section = {
		_id: string;
		title: string;
		lectures: Lecture[];
	};

	type LectureData = {
		success: boolean;
		message: string;
		data?: Object;
		errors?: string[];
	};

	const { getAllByCourseReference } = useSection();
	const { uploadContent } = useLecture();
	const { courseReference } = useParams();

	const [sections, setSections] = useState<Section[]>([]);
	const [lectureData, setLectureData] = useState<LectureData>({
		success: false,
		message: "",
		data: {},
		errors: [],
	});
	const [showFileUploadDiv, setShowFileUploadDiv] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [showCircularProgress, setShowCircularProgress] = useState(false);

	useEffect(() => {
		const getSectionsFromApi = async () => {
			try {
				const result = await getAllByCourseReference(courseReference);
				setSections(result.data.result);
			} catch (error) {
				console.error("Error setting data:", error);
			}
		};

		getSectionsFromApi();
	}, []);

	const handleFileChange = (e: any) => {
		const file = e.target.files[0];
		setSelectedFile(file);
	};

	const handleContentButtonClick = (_: React.MouseEvent<HTMLButtonElement>) => {
		setShowFileUploadDiv(!showFileUploadDiv);
	};

	const handleSave = async (lectureReference: string | null | undefined) => {
		setShowCircularProgress(true);

		const data = {
			lectureReference: lectureReference,
			content: selectedFile,
		};
		const result = await uploadContent(data);
		if (result.error) {
			setShowCircularProgress(false);
			setLectureData(result.error.response.data);
		} else {
			setShowCircularProgress(false);
			setLectureData(result);
		}
	};

	function extractFilename(url: string) {
		const path = decodeURIComponent(new URL(url).pathname);
		const filename = path.split("/").pop()?.replace(/%20/g, " ");

		return filename;
	}

	return (
		<Box
			component="main"
			sx={{ flexGrow: 1, p: 3 }}>
			<Toolbar />
			<Paper
				elevation={3}
				sx={{
					width: "100%",
					height: "100vh",
				}}>
				<Box
					sx={{
						width: "100%",
						height: "15%",
						border: "0.5px solid #e5e5e5",
						paddingLeft: "40px",
						display: "flex",
						alignItems: "center",
					}}>
					<AtomTypography
						component="h1"
						variant="h5">
						Curriculum
					</AtomTypography>
				</Box>

				<Box
					p={3}
					display="flex"
					flexDirection="column"
					gap="30px">
					<AtomTypography
						component="p"
						variant="body1">
						Start putting together your course by creating sections, lectures
						and practice (quizzes, coding exercises and assignments). Use your
						course outline to structure your content and label your sections and
						lectures clearly. If you're intending to offer your course for free,
						the total length of video content must be less than 2 hours.
					</AtomTypography>
					{sections.map((section, index) => (
						<Card
							key={index}
							square
							variant="outlined"
							sx={{
								width: "100%",
								display: "flex",
								flexDirection: "column",
								border: "0.5px solid gray",
								bgcolor: "#f6f7fa",
							}}>
							<AtomTypography
								component="p"
								variant="body1"
								sx={{
									mt: 3,
									ml: 1,
									display: "flex",
									alignItems: "center",
								}}>
								<strong>Section {index + 1}:</strong>{" "}
								<InsertDriveFileOutlinedIcon
									sx={{ fontSize: "inherit", ml: 1, mr: 1 }}
								/>
								{section.title}
								<AtomIconButton color="inherit">
									<EditIcon sx={{ fontSize: "15px", ml: 1 }} />
								</AtomIconButton>
								<AtomIconButton color="inherit">
									<DeleteIcon sx={{ fontSize: "15px" }} />
								</AtomIconButton>
							</AtomTypography>

							{section.lectures.map((lecture, index) => (
								<Box
									key={index}
									mt={4}
									mr={1}
									mb={2}
									ml={6}
									border="0.5px solid gray"
									bgcolor="#fff">
									<Box
										p={1}
										display="flex"
										alignItems="center"
										justifyContent="space-between">
										<Box>
											<CheckCircleIcon
												sx={{
													fontSize: "inherit",
													mr: 1,
												}}
											/>
											Lecture {index + 1}:
											<InsertDriveFileOutlinedIcon
												sx={{
													fontSize: "inherit",
													ml: 1,
													mr: 1,
												}}
											/>
											{lecture.title}
										</Box>
										<Box mr={4}>
											{lecture.content ? (
												<AtomIconButton onClick={handleContentButtonClick}>
													<ExpandMoreIcon />
												</AtomIconButton>
											) : (
												<AtomButton
													variant="outlined"
													color="inherit"
													onClick={handleContentButtonClick}>
													<AddIcon
														sx={{
															mr: 1,
														}}
													/>
													<AtomTypography
														component="p"
														sx={{ textTransform: "none" }}>
														Content
													</AtomTypography>
												</AtomButton>
											)}
										</Box>
									</Box>
									{showFileUploadDiv && (
										<Box
											mt={2}
											display="flex"
											alignItems="center"
											justifyContent="space-between"
											borderTop="0.5px solid gray"
											p={1}>
											<Box paddingLeft={2}>
												<AtomTypography
													component="p"
													variant="body1">
													{lecture.content
														? extractFilename(lecture.content)
														: selectedFile
														? selectedFile.name
														: "No file selected"}
												</AtomTypography>
											</Box>
											{!lecture.content ? (
												lectureData.message === "" && (
													<Box display="flex">
														<Box
															borderLeft="0.5px solid gray"
															mr={1}
															sx={{
																"&:hover": {
																	bgcolor: "#d2d5d8",
																},
															}}>
															<label htmlFor="file-input">
																<AtomButton
																	variant="text"
																	color="inherit"
																	component="span">
																	Select file
																	<Input
																		id="file-input"
																		type="file"
																		style={{ display: "none" }}
																		onChange={handleFileChange}
																	/>
																</AtomButton>
															</label>
														</Box>
														<Box>
															<AtomButton
																variant="contained"
																disabled={selectedFile ? false : true}
																onClick={() => handleSave(lecture._id)}
																sx={{
																	mr: 5,
																	ml: 2,
																}}>
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
													</Box>
												)
											) : (
												<AtomTypography
													component="p"
													variant="body1"
													sx={{
														mr: 5,
													}}>
													Preview
												</AtomTypography>
											)}
										</Box>
									)}
								</Box>
							))}
						</Card>
					))}
				</Box>
			</Paper>
		</Box>
	);
};

export default CourseCurriculum;
