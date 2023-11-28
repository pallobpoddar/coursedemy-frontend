import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AtomTypography from "../atoms/AtomTypography";
import AtomButton from "../atoms/AtomButton";
import { useEffect, useState } from "react";
import { Course } from "../../interfaces/courseInterface";
import useCourse from "../../hooks/useCourse";

type Response = {
	success: boolean;
	message: string;
	data?: Object;
	errors?: string[];
};

const CourseList = () => {
	const { getAll } = useCourse();

	const [courses, setCourses] = useState<Course[]>([]);
	const [response, setResponse] = useState<Response>({
		success: false,
		message: "",
		data: {},
		errors: [],
	});

	useEffect(() => {
		const getCoursesFromApi = async () => {
			try {
				const result = await getAll();
				setCourses(result.data);
				setResponse(result);
			} catch (error) {
				console.error("Error setting data:", error);
			}
		};

		getCoursesFromApi();
	}, []);

	return (
		<>
			<Container sx={{ py: 8 }} maxWidth="md">
				<Grid container spacing={4}>
					{response.message !== "" && (
						<>
							{courses.map((course) => (
								<Grid
									item
									key={course._id}
									xs={12}
									sm={6}
									md={4}
								>
									<Card
										sx={{
											height: "100%",
											display: "flex",
											flexDirection: "column",
										}}
									>
										<CardMedia
											component="div"
											sx={{
												pt: "56.25%",
											}}
											image={course.thumbnail}
										/>
										<CardContent sx={{ flexGrow: 1 }}>
											<AtomTypography
												gutterBottom
												variant="h5"
												component="h2"
											>
												{course.title}
											</AtomTypography>
											{/* <Typography>
										{course.instructorReference}
									</Typography> */}
										</CardContent>
										<CardActions>
											<AtomButton size="small">
												Add to cart
											</AtomButton>
											{/* <AtomButton size="small">Edit</AtomButton> */}
										</CardActions>
									</Card>
								</Grid>
							))}
						</>
					)}
				</Grid>
			</Container>
		</>
	);
};

export default CourseList;
