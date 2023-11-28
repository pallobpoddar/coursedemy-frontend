import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AtomAlert from "../atoms/AtomAlert";
import AtomTypography from "../atoms/AtomTypography";
import AtomButton from "../atoms/AtomButton";
import AtomCircularProgress from "../atoms/AtomCircularProgress";
import useCourse from "../../hooks/useCourse";

const PublicationRequestSection = () => {
	type CourseData = {
		success: boolean;
		message: string;
		data?: Object;
		errors?: string[];
	};

	const [showCircularProgress, setShowCircularProgress] = useState(false);
	const [courseData, setCourseData] = useState<CourseData>({
		success: false,
		message: "",
		data: {},
		errors: [],
	});

	const { publishCourse } = useCourse();
	const { courseReference } = useParams();

	const handlerOnSubmit = async (e: any) => {
		e.preventDefault();
		setShowCircularProgress(true);
		const formData = {
			courseReference: courseReference,
		};
		const result = await publishCourse(formData);
		if (result.error) {
			setShowCircularProgress(false);
			setCourseData(result.error.response.data);
		} else {
			setShowCircularProgress(false);
			setCourseData(result);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Container maxWidth="xs" sx={{ backgroundColor: "white" }}>
				<Box
					component="form"
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					{courseData.message !== "" && (
						<AtomAlert
							variant="filled"
							severity={
								courseData.success === true
									? "success"
									: "error"
							}
							sx={{ mb: 2, width: "100%" }}
						>
							{courseData.message}
						</AtomAlert>
					)}
					<AtomTypography component="h1" variant="h4">
						Accept the course
					</AtomTypography>
					<AtomButton
						type="submit"
						variant="contained"
						size="large"
						fullWidth
						sx={{ mt: 2, mb: 4 }}
						onClick={handlerOnSubmit}
					>
						{showCircularProgress === true ? (
							<AtomCircularProgress color="inherit" size={25} />
						) : (
							<>Accept</>
						)}
					</AtomButton>

					<AtomTypography component="h1" variant="h4">
						Reject the course
					</AtomTypography>
					<AtomButton
						type="submit"
						variant="contained"
						size="large"
						color="error"
						fullWidth
						sx={{ mt: 2 }}
					>
						Reject
					</AtomButton>
				</Box>
			</Container>
		</Box>
	);
};

export default PublicationRequestSection;
