import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AtomTypography from "../atoms/AtomTypography";
import AtomButton from "../atoms/AtomButton";
import useCourse from "../../hooks/useCourse";
import { IAuthStateProp } from "../../interfaces/stateInterface";
import IMAGE_URL from "../../constants/imageURLs";
import { Course } from "../../interfaces/courseInterface";

const InstructorDashboardCourseList = () => {
	const DrawerHeader = styled("div")(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	}));

	const { getAllByInstructorReference } = useCourse();

	const instructorReference = useSelector(
		(state: IAuthStateProp) => state.auth?.instructorReference?._id
	);

	const [courses, setCourses] = useState<Course[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		const getCoursesFromApi = async () => {
			try {
				const result = await getAllByInstructorReference(instructorReference);
				setCourses(result.data.result);
			} catch (error) {
				console.error("Error setting data:", error);
			}
		};

		getCoursesFromApi();
	}, []);

	const handleCardClick = (course: string) => {
		navigate(`/instructor/course/${course}`);
	};

	return (
		<Box
			component="main"
			sx={{ flexGrow: 1, p: 3 }}>
			<DrawerHeader />
			<Container maxWidth="xl">
				<Card
					variant="outlined"
					square
					sx={{
						mb: 3,
						width: "100%",
						height: "20vh",
						display: "flex",
						alignItems: "center",
					}}>
					<Grid
						container
						spacing={2}>
						<Grid
							item
							xs={6}
							textAlign="center">
							<AtomTypography
								component="p"
								variant="body1">
								Jump Into Course Creation
							</AtomTypography>
						</Grid>
						<Grid
							item
							xs
							textAlign="center">
							<Link to="/instructor/course/create">
								<AtomButton variant="contained">Create Your Course</AtomButton>
							</Link>
						</Grid>
					</Grid>
				</Card>
				{courses.map((course) => (
					<Card
						variant="outlined"
						square
						onClick={() => handleCardClick(course._id)}
						sx={{
							mb: 3,
							width: "100%",
							height: "20vh",
							display: "flex",
							transition: "box-shadow 0.3s ease",
							"&:hover": {
								cursor: "pointer",
								boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
							},
						}}>
						<img
							src={IMAGE_URL.INSTRUCTOR_DASHBOARD_DECORATION}
							width="10%"
							height="100%"
						/>
						<Box
							width="40%"
							display="flex"
							flexDirection="column"
							justifyContent="space-between"
							m={2}>
							<AtomTypography
								component="p"
								variant="body2"
								sx={{ fontWeight: "bold" }}>
								{course.title}
							</AtomTypography>
							<AtomTypography
								component="p"
								variant="body1"
								sx={{ fontWeight: "bold" }}>
								{course.isApproved ? "Published" : "Draft"}
							</AtomTypography>
						</Box>
						<Box
							width="50%"
							display="flex"
							alignItems="center"
							justifyContent="center">
							<AtomTypography
								component="p"
								variant="body1"
								color="primary"
								sx={{ fontWeight: "bold" }}>
								Finish your course
							</AtomTypography>
						</Box>
					</Card>
				))}
			</Container>
		</Box>
	);
};

export default InstructorDashboardCourseList;
