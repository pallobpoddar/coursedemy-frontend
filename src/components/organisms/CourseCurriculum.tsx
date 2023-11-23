import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import AtomTypography from "../atoms/AtomTypography";
import useSection from "../../hooks/useSection";
import AtomButton from "../atoms/AtomButton";

const CourseCurriculum = () => {
	type Lecture = {
		_id: string;
		title: string;
		isAccessibleToUnsubscribedLearners: boolean;
	};

	type Section = {
		_id: string;
		title: string;
		lectures: Lecture[];
	};

	const { getAllByCourseReference } = useSection();
	const { courseReference } = useParams();

	const [sections, setSections] = useState<Section[]>([]);

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

	return (
		<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
			<Toolbar />
			<Paper
				elevation={3}
				sx={{
					width: "100%",
					height: "100vh",
				}}
			>
				<Box
					sx={{
						width: "100%",
						height: "15%",
						border: "0.5px solid #e5e5e5",
						paddingLeft: "40px",
						display: "flex",
						alignItems: "center",
					}}
				>
					<AtomTypography component="h1" variant="h5">
						Curriculum
					</AtomTypography>
				</Box>
				<Box p={3} display="flex" flexDirection="column" gap="30px">
					<AtomTypography component="p" variant="body1">
						Start putting together your course by creating sections,
						lectures and practice (quizzes, coding exercises and
						assignments). Use your course outline to structure your
						content and label your sections and lectures clearly. If
						you're intending to offer your course for free, the
						total length of video content must be less than 2 hours.
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
							}}
						>
							<AtomTypography
								component="p"
								variant="body1"
								sx={{
									mt: 3,
									ml: 1,
									display: "flex",
									alignItems: "center",
								}}
							>
								<strong>Section {index + 1}:</strong>{" "}
								<InsertDriveFileOutlinedIcon
									sx={{ fontSize: "inherit", ml: 1, mr: 1 }}
								/>
								{section.title}
							</AtomTypography>
							{section.lectures.map((lecture, index) => (
								<Box
									key={index}
									mt={4}
									mr={1}
									mb={2}
									ml={6}
									p={1}
									border="0.5px solid gray"
									bgcolor="#fff"
								>
									<Box>
										<Box
											display="flex"
											alignItems="center"
											justifyContent="space-between"
										>
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
												<AtomButton
													variant="outlined"
													color="inherit"
												>
													<AddIcon
														sx={{
															mr: 1,
														}}
													/>
													Content
												</AtomButton>
											</Box>
										</Box>
									</Box>
									<Box></Box>
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
