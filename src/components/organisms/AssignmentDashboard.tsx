import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import AtomTypography from "../atoms/AtomTypography";
import AtomButton from "../atoms/AtomButton";
import useAssignment from "../../hooks/useAssignment";
import IMAGE_URL from "../../constants/imageURLs";
import { Assignment } from "../../interfaces/assignmentInterface";
import AtomSkeleton from "../atoms/AtomSkeleton";

const AssignmentDashboard = () => {
	const { getAllByCourseReference } = useAssignment();

	const { courseReference } = useParams();

	const [assignments, setAssignments] = useState<Assignment[]>([]);
	const [showSkeleton, setShowSkeleton] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		const getAssignmentsFromApi = async () => {
			try {
				const result = await getAllByCourseReference(courseReference);
				setAssignments(result.data.result);
			} catch (error) {
				console.error("Error setting data:", error);
			} finally {
				setShowSkeleton(false);
			}
		};

		getAssignmentsFromApi();
	}, []);

	const handleCardClick = (assignment: string) => {
		navigate(`/instructor/course/${courseReference}/assignments/${assignment}`);
	};

	return (
		<Box
			component="main"
			sx={{ flexGrow: 1, p: 3 }}>
			<Container maxWidth="xl">
				<Card
					variant="outlined"
					square
					sx={{
						mt: 10,
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
								Jump Into Assignment Creation
							</AtomTypography>
						</Grid>
						<Grid
							item
							xs
							textAlign="center">
							<Link
								to={`/instructor/course/${courseReference}/assignments/create`}>
								<AtomButton variant="contained">
									Create Your Assignment
								</AtomButton>
							</Link>
						</Grid>
					</Grid>
				</Card>
				{showSkeleton && (
					<Box
						width="100%"
						height="20vh"
						display="flex">
						<AtomSkeleton
							variant="rectangular"
							animation="wave"
							width="10%"
							height="100%"
						/>
						<Box
							width="40%"
							display="flex"
							flexDirection="column"
							justifyContent="space-between"
							m={2}>
							<AtomSkeleton
								variant="text"
								animation="wave"
							/>
							<AtomSkeleton
								variant="text"
								animation="wave"
								width="20%"
							/>
						</Box>
						<Box
							width="50%"
							display="flex"
							alignItems="center"
							justifyContent="center">
							<AtomSkeleton
								variant="text"
								animation="wave"
								width="25%"
							/>
						</Box>
					</Box>
				)}
				{assignments.map((assignment, index) => (
					<Card
						key={index}
						variant="outlined"
						square
						onClick={() => handleCardClick(assignment._id)}
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
							justifyContent="center"
							m={2}>
							<AtomTypography
								component="p"
								variant="body2"
								sx={{ fontWeight: "bold" }}>
								{assignment.title}
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
								Finish your assignment
							</AtomTypography>
						</Box>
					</Card>
				))}
			</Container>
		</Box>
	);
};

export default AssignmentDashboard;
