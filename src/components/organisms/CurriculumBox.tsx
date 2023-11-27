import { useEffect, useState, Fragment } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import Input from "@mui/material/Input";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AtomTypography from "../atoms/AtomTypography";
import useSection from "../../hooks/useSection";
import useLecture from "../../hooks/useLecture";
import AtomButton from "../atoms/AtomButton";
import AtomCircularProgress from "../atoms/AtomCircularProgress";
import AtomIconButton from "../atoms/AtomIconButton";
import MoleculeTextField from "../molecules/MoleculeTextField";
import MoleculeAlertDialog from "../molecules/MoleculeAlertDialog";

const CurriculumBox = () => {
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
		data?: {
			_id: string;
			title: string;
			content: string;
		};
		errors?: string[];
	};

	type SectionData = {
		success: boolean;
		message: string;
		data?: {
			_id: string;
			courseReference: string;
			title: string;
			lectures: Array<string>;
		};
		errors?: string[];
	};

	const {
		createSection,
		getAllByCourseReference,
		updateOneBySectionReference,
		deleteOneBySectionReference,
	} = useSection();
	const {
		createLecture,
		updateOneByLectureReference,
		uploadContent,
		deleteOneByLectureReference,
	} = useLecture();
	const { courseReference } = useParams();

	const [sections, setSections] = useState<Section[]>([]);
	const [sectionData, setSectionData] = useState<SectionData>({
		success: false,
		message: "",
		data: {
			_id: "",
			courseReference: "",
			title: "",
			lectures: [],
		},
		errors: [],
	});

	const [lectureData, setLectureData] = useState<LectureData>({
		success: false,
		message: "",
		data: {
			_id: "",
			title: "",
			content: "",
		},
		errors: [],
	});
	const [showFileUploadDiv, setShowFileUploadDiv] = useState<String | null>(
		null
	);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [showCircularProgress, setShowCircularProgress] = useState(false);
	const [isSectionTitleEditable, setIsSectionTitleEditable] =
		useState<String | null>(null);
	const [isLectureTitleEditable, setIsLectureTitleEditable] =
		useState<String | null>(null);
	const [textFieldSectionTitle, setTextFieldSectionTitle] = useState("");
	const [textFieldLectureTitle, setTextFieldLectureTitle] = useState("");
	const [isSectionAlertDialogVisible, setIsSectionAlertDialogVisible] =
		useState<String | null>(null);
	const [isLectureAlertDialogVisible, setIsLectureAlertDialogVisible] =
		useState<String | null>(null);

	const [isSectionPanelVisible, setIsSectionPanelVisible] =
		useState<String | null>(null);
	const [isLecturePanelVisible, setIsLecturePanelVisible] =
		useState<String | null>(null);
	const [isAddSectionButtonVisible, setIsAddSectionButtonVisible] =
		useState(true);
	const [isAddLectureButtonVisible, setIsAddLectureButtonVisible] =
		useState<String | null>(null);
	const [rerender, setRerender] = useState(false);
	const [renderCounter, setRenderCounter] = useState(1);

	useEffect(() => {
		const getSectionsFromApi = async () => {
			try {
				const result = await getAllByCourseReference(courseReference);
				setSections(result.data.result);
				setRenderCounter(renderCounter + 1);
			} catch (error) {
				console.error("Error setting data:", error);
			}
		};

		getSectionsFromApi();
	}, [rerender]);

	const handleFileChange = (e: any) => {
		const file = e.target.files[0];
		setSelectedFile(file);
	};

	const handleContentButtonClick = (id: string | null) => {
		setShowFileUploadDiv((prevButton) => (prevButton === id ? null : id));
	};

	const handleTextFieldSectionTitleChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setTextFieldSectionTitle(event.target.value);
	};

	const handleTextFieldLectureTitleChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setTextFieldLectureTitle(event.target.value);
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

	const handleSectionTitleEditButtonOnClick = (id: string | null) => {
		setIsSectionTitleEditable((prevButton) => (prevButton === id ? null : id));
	};

	const handleSectionTitleDeleteButtonOnClick = (id: string | null) => {
		setIsSectionAlertDialogVisible((prevButton) =>
			prevButton === id ? null : id
		);
	};

	const handleSectionAlertDialogOKButtonOnClick = async (id: string) => {
		setShowCircularProgress(true);
		const result = await deleteOneBySectionReference(id);
		if (result.error) {
			setShowCircularProgress(false);
			setIsSectionAlertDialogVisible(null);
		} else {
			setShowCircularProgress(false);
			setIsSectionAlertDialogVisible(null);
			setIsSectionPanelVisible(id);
		}
	};

	const handleSectionTitleSaveButtonOnClick = async (
		id: string,
		title: string
	) => {
		setShowCircularProgress(true);
		let data;
		textFieldSectionTitle === ""
			? (data = {
					id: id,
					title: title,
			  })
			: (data = {
					id: id,
					title: textFieldSectionTitle,
			  });

		const result = await updateOneBySectionReference(data);
		if (result.error) {
			setShowCircularProgress(false);
		} else {
			setShowCircularProgress(false);
			setIsSectionTitleEditable(null);
			setSectionData(result);
		}
	};

	const handleLectureTitleEditButtonOnClick = (id: string | null) => {
		setIsLectureTitleEditable((prevButton) => (prevButton === id ? null : id));
	};

	const handleLectureTitleDeleteButtonOnClick = (id: string | null) => {
		setIsLectureAlertDialogVisible((prevButton) =>
			prevButton === id ? null : id
		);
	};

	const handleSectionAlertDialogClose = () => {
		setIsSectionAlertDialogVisible(null);
	};

	const handleLectureAlertDialogClose = () => {
		setIsLectureAlertDialogVisible(null);
	};

	const handleLectureAlertDialogOKButtonOnClick = async (id: string) => {
		setShowCircularProgress(true);
		const result = await deleteOneByLectureReference(id);
		if (result.error) {
			setShowCircularProgress(false);
			setIsLectureAlertDialogVisible(null);
		} else {
			setShowCircularProgress(false);
			setIsLectureAlertDialogVisible(null);
			setIsLecturePanelVisible(id);
		}
	};

	const handleLectureTitleSaveButtonOnClick = async (
		id: string,
		title: string
	) => {
		setShowCircularProgress(true);
		let data;
		textFieldLectureTitle === ""
			? (data = {
					id: id,
					title: title,
			  })
			: (data = {
					id: id,
					title: textFieldLectureTitle,
			  });
		const result = await updateOneByLectureReference(data);
		if (result.error) {
			setShowCircularProgress(false);
			setLectureData(result.error.response.data);
		} else {
			setShowCircularProgress(false);
			setLectureData(result);
			setIsLectureTitleEditable(null);
		}
	};

	const handlePlusSectionButtonOnClick = () => {
		setIsAddSectionButtonVisible(false);
	};

	const handleCancelSectionButtonOnClick = () => {
		setIsAddSectionButtonVisible(true);
	};

	const handleAddSectionButtonOnClick = async (title: string) => {
		const data = {
			courseReference: courseReference,
			title: title,
		};
		setShowCircularProgress(true);
		const result = await createSection(data);
		if (result.error) {
			setShowCircularProgress(false);
			setIsAddSectionButtonVisible(true);
		} else {
			setShowCircularProgress(false);
			setIsAddSectionButtonVisible(true);
			setRerender(!rerender);
		}
	};

	const handlePlusLectureButtonOnClick = async (id: string | null) => {
		setIsAddLectureButtonVisible((prevButton) =>
			prevButton === id ? null : id
		);
	};

	const handleCancelLectureButtonOnClick = async () => {
		setIsAddLectureButtonVisible(null);
	};

	const handleAddLectureButtonOnClick = async (
		sectionReference: string,
		title: string
	) => {
		const data = {
			sectionReference: sectionReference,
			title: title,
		};
		setShowCircularProgress(true);
		const result = await createLecture(data);
		if (result.error) {
			setShowCircularProgress(false);
			setIsAddLectureButtonVisible(null);
		} else {
			setShowCircularProgress(false);
			setIsAddLectureButtonVisible(null);
			setRerender(!rerender);
		}
	};

	function extractFilename(url: string) {
		const path = decodeURIComponent(new URL(url).pathname);
		const filename = path.split("/").pop()?.replace(/%20/g, " ");

		return filename;
	}

	let lectureCounter = 0;
	let sectionCounter = 0;

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
					{renderCounter === 1 ? (
						<Box
							display="flex"
							justifyContent="center">
							<AtomCircularProgress color="inherit" />
						</Box>
					) : (
						<>
							{sections.map((section, index) => (
								<Fragment key={index}>
									{isSectionPanelVisible !== section._id && (
										<Card
											square
											variant="outlined"
											sx={{
												width: "100%",
												display: "flex",
												flexDirection: "column",
												border: "0.5px solid gray",
												bgcolor: "#f6f7fa",
											}}>
											{isSectionTitleEditable === section._id ? (
												<>
													<Box
														display="flex"
														alignItems="center">
														<AtomTypography
															component="p"
															variant="body1"
															sx={{
																width: "10%",
																mt: 3,
																ml: 1,
															}}>
															<strong>Section {(sectionCounter += 1)}:</strong>
														</AtomTypography>
														<MoleculeTextField
															id="section-title-edit"
															variant="outlined"
															fullWidth
															defaultValue={
																sectionData.data?._id === section._id
																	? sectionData.data.title
																	: section.title
															}
															onChange={handleTextFieldSectionTitleChange}
															sx={{
																mt: 4,
																mr: 1,
																mb: 2,
																bgcolor: "#fff",
															}}
														/>
													</Box>
													<Box
														display="flex"
														justifyContent="flex-end"
														mr={1}>
														<AtomButton
															variant="text"
															size="small"
															onClick={() =>
																handleSectionTitleEditButtonOnClick(null)
															}>
															Cancel
														</AtomButton>
														<AtomButton
															variant="contained"
															size="small"
															onClick={() =>
																handleSectionTitleSaveButtonOnClick(
																	section._id,
																	section.title
																)
															}
															sx={{ ml: 2 }}>
															{showCircularProgress ? (
																<AtomCircularProgress
																	color="inherit"
																	size={25}
																/>
															) : (
																<>Save</>
															)}
														</AtomButton>
													</Box>
												</>
											) : (
												<AtomTypography
													component="p"
													variant="body1"
													sx={{
														mt: 3,
														ml: 1,
														display: "flex",
														alignItems: "center",
													}}>
													<strong>Section {(sectionCounter += 1)}:</strong>{" "}
													<InsertDriveFileOutlinedIcon
														sx={{
															fontSize: "inherit",
															ml: 1,
															mr: 1,
														}}
													/>
													{sectionData.data?._id === section._id
														? sectionData.data.title
														: section.title}
													<AtomIconButton
														color="inherit"
														onClick={() =>
															handleSectionTitleEditButtonOnClick(section._id)
														}>
														<EditIcon
															sx={{
																fontSize: "15px",
																ml: 1,
															}}
														/>
													</AtomIconButton>
													<AtomIconButton
														color="inherit"
														onClick={() =>
															handleSectionTitleDeleteButtonOnClick(section._id)
														}>
														<DeleteIcon
															sx={{
																fontSize: "15px",
															}}
														/>
													</AtomIconButton>
												</AtomTypography>
											)}

											{section.lectures.map((lecture, index) => (
												<Fragment key={index}>
													{isLecturePanelVisible !== lecture._id && (
														<Box
															mt={4}
															mr={1}
															mb={1}
															ml={6}
															border="0.5px solid gray"
															bgcolor="#fff">
															{isLectureTitleEditable === lecture._id ? (
																<Box>
																	<Box
																		display="flex"
																		alignItems="center">
																		<AtomTypography
																			component="p"
																			variant="body1"
																			sx={{
																				width: "10%",
																				mt: 3,
																				ml: 1,
																			}}>
																			<strong>
																				Lecture {(lectureCounter += 1)}:
																			</strong>
																		</AtomTypography>
																		<MoleculeTextField
																			id="lecture-title-edit"
																			variant="outlined"
																			fullWidth
																			defaultValue={
																				lectureData.data?._id === lecture._id
																					? lectureData.data?.title
																					: lecture.title
																			}
																			onChange={
																				handleTextFieldLectureTitleChange
																			}
																			sx={{
																				mt: 4,
																				mr: 1,
																				mb: 2,
																				bgcolor: "#fff",
																			}}
																		/>
																	</Box>
																	<Box
																		display="flex"
																		justifyContent="flex-end"
																		mr={1}
																		mb={1}>
																		<AtomButton
																			variant="text"
																			size="small"
																			onClick={() =>
																				handleLectureTitleEditButtonOnClick(
																					null
																				)
																			}>
																			Cancel
																		</AtomButton>
																		<AtomButton
																			variant="contained"
																			size="small"
																			onClick={() =>
																				handleLectureTitleSaveButtonOnClick(
																					lecture._id,
																					lecture.title
																				)
																			}
																			sx={{
																				ml: 2,
																			}}>
																			{showCircularProgress ? (
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
															) : (
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
																		Lecture {(lectureCounter += 1)}
																		:
																		<InsertDriveFileOutlinedIcon
																			sx={{
																				fontSize: "inherit",
																				ml: 1,
																				mr: 1,
																			}}
																		/>
																		{lectureData.data?._id === lecture._id
																			? lectureData.data?.title
																			: lecture.title}
																		<AtomIconButton
																			color="inherit"
																			onClick={() =>
																				handleLectureTitleEditButtonOnClick(
																					lecture._id
																				)
																			}>
																			<EditIcon
																				sx={{
																					fontSize: "15px",
																					ml: 1,
																				}}
																			/>
																		</AtomIconButton>
																		<AtomIconButton
																			color="inherit"
																			onClick={() =>
																				handleLectureTitleDeleteButtonOnClick(
																					lecture._id
																				)
																			}>
																			<DeleteIcon
																				sx={{
																					fontSize: "15px",
																				}}
																			/>
																		</AtomIconButton>
																	</Box>
																	<Box mr={4}>
																		{lecture.content ? (
																			<AtomIconButton
																				onClick={() =>
																					handleContentButtonClick(lecture._id)
																				}>
																				{showFileUploadDiv === lecture._id ? (
																					<ExpandLessIcon />
																				) : (
																					<ExpandMoreIcon />
																				)}
																			</AtomIconButton>
																		) : (
																			<AtomButton
																				variant="outlined"
																				color="inherit"
																				onClick={() =>
																					handleContentButtonClick(lecture._id)
																				}>
																				{showFileUploadDiv === lecture._id ? (
																					<CloseIcon
																						sx={{
																							mr: 1,
																						}}
																					/>
																				) : (
																					<AddIcon
																						sx={{
																							mr: 1,
																						}}
																					/>
																				)}
																				<AtomTypography
																					component="p"
																					sx={{
																						textTransform: "none",
																					}}>
																					Content
																				</AtomTypography>
																			</AtomButton>
																		)}
																	</Box>
																</Box>
															)}
															{showFileUploadDiv === lecture._id && (
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
																	{!lecture.content && (
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
																							style={{
																								display: "none",
																							}}
																							onChange={handleFileChange}
																						/>
																					</AtomButton>
																				</label>
																			</Box>
																			<Box>
																				<AtomButton
																					variant="contained"
																					disabled={selectedFile ? false : true}
																					onClick={() =>
																						handleSave(lecture._id)
																					}
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
																	)}
																</Box>
															)}
															<MoleculeAlertDialog
																open={
																	isLectureAlertDialogVisible === lecture._id
																}
																onClose={handleLectureAlertDialogClose}
																onOKButtonClick={() =>
																	handleLectureAlertDialogOKButtonOnClick(
																		lecture._id
																	)
																}
															/>
														</Box>
													)}
												</Fragment>
											))}
											<MoleculeAlertDialog
												open={isSectionAlertDialogVisible === section._id}
												onClose={handleSectionAlertDialogClose}
												onOKButtonClick={() =>
													handleSectionAlertDialogOKButtonOnClick(section._id)
												}
											/>
											{isAddLectureButtonVisible === null && (
												<AtomButton
													variant="outlined"
													color="inherit"
													onClick={() =>
														handlePlusLectureButtonOnClick(section._id)
													}
													sx={{
														width: "100px",
														m: 2,
													}}>
													<AddIcon
														sx={{
															mr: 1,
														}}
													/>
													<AtomTypography
														component="p"
														sx={{
															textTransform: "none",
														}}>
														Lecture
													</AtomTypography>
												</AtomButton>
											)}

											{isAddLectureButtonVisible === section._id && (
												<Card
													square
													variant="outlined"
													sx={{
														width: "100%",
														display: "flex",
														flexDirection: "column",
														border: "0.5px solid gray",
														bgcolor: "#f6f7fa",
													}}>
													<Box
														display="flex"
														alignItems="center">
														<AtomTypography
															component="p"
															variant="body1"
															sx={{
																width: "10%",
																mt: 3,
																ml: 1,
															}}>
															<strong>New Lecture:</strong>
														</AtomTypography>
														<MoleculeTextField
															id="section-title-edit"
															variant="outlined"
															fullWidth
															placeholder="Enter a title"
															onChange={handleTextFieldLectureTitleChange}
															sx={{
																mt: 4,
																mr: 1,
																mb: 2,
																bgcolor: "#fff",
															}}
														/>
													</Box>

													<Box
														display="flex"
														justifyContent="flex-end"
														mr={1}
														mb={1}>
														<AtomButton
															variant="text"
															size="small"
															onClick={handleCancelLectureButtonOnClick}>
															Cancel
														</AtomButton>
														<AtomButton
															variant="contained"
															size="small"
															onClick={() =>
																handleAddLectureButtonOnClick(
																	section._id,
																	textFieldLectureTitle
																)
															}
															sx={{ ml: 2 }}>
															{showCircularProgress ? (
																<AtomCircularProgress
																	color="inherit"
																	size={25}
																/>
															) : (
																<>Add Lecture</>
															)}
														</AtomButton>
													</Box>
												</Card>
											)}
										</Card>
									)}
								</Fragment>
							))}
							{isAddSectionButtonVisible && (
								<AtomButton
									variant="outlined"
									color="inherit"
									onClick={handlePlusSectionButtonOnClick}
									sx={{ width: "100px" }}>
									<AddIcon
										sx={{
											mr: 1,
										}}
									/>
									<AtomTypography
										component="p"
										sx={{
											textTransform: "none",
										}}>
										Section
									</AtomTypography>
								</AtomButton>
							)}

							{!isAddSectionButtonVisible && (
								<Card
									square
									variant="outlined"
									sx={{
										width: "100%",
										display: "flex",
										flexDirection: "column",
										border: "0.5px solid gray",
										bgcolor: "#f6f7fa",
									}}>
									<Box
										display="flex"
										alignItems="center">
										<AtomTypography
											component="p"
											variant="body1"
											sx={{
												width: "10%",
												mt: 3,
												ml: 1,
											}}>
											<strong>New Section:</strong>
										</AtomTypography>
										<MoleculeTextField
											id="section-title-edit"
											variant="outlined"
											fullWidth
											placeholder="Enter a title"
											onChange={handleTextFieldSectionTitleChange}
											sx={{
												mt: 4,
												mr: 1,
												mb: 2,
												bgcolor: "#fff",
											}}
										/>
									</Box>

									<Box
										display="flex"
										justifyContent="flex-end"
										mr={1}
										mb={1}>
										<AtomButton
											variant="text"
											size="small"
											onClick={handleCancelSectionButtonOnClick}>
											Cancel
										</AtomButton>
										<AtomButton
											variant="contained"
											size="small"
											onClick={() =>
												handleAddSectionButtonOnClick(textFieldSectionTitle)
											}
											sx={{ ml: 2 }}>
											{showCircularProgress ? (
												<AtomCircularProgress
													color="inherit"
													size={25}
												/>
											) : (
												<>Add Section</>
											)}
										</AtomButton>
									</Box>
								</Card>
							)}
						</>
					)}
				</Box>
			</Paper>
		</Box>
	);
};

export default CurriculumBox;
