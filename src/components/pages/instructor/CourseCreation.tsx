import Box from "@mui/material/Box";
import CourseCreationForm from "../../organisms/CourseCreationForm";
import InstructorPageHeader from "../../organisms/InstructorPageHeader";
import Container from "@mui/material/Container";

const CourseCreation = () => {
	return (
		<Box>
			<InstructorPageHeader />
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					minHeight: "100vh",
				}}
			>
				<Container maxWidth="sm" sx={{ textAlign: "center" }}>
					<CourseCreationForm />
				</Container>
			</Box>
		</Box>
	);
};

export default CourseCreation;
