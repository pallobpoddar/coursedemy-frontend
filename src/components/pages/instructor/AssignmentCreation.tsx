import Box from "@mui/material/Box";
import InstructorPageHeader from "../../organisms/InstructorPageHeader";
import Container from "@mui/material/Container";
import AssignmentCreationForm from "../../organisms/AssignmentCreationForm";
import { useParams } from "react-router-dom";

const AssignmentCreation = () => {
	const { courseReference } = useParams();
	return (
		<Box>
			<InstructorPageHeader
				typography="Back to Assignments"
				link={`/instructor/course/${courseReference}/assignments`}
			/>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					minHeight: "100vh",
				}}>
				<Container
					maxWidth="sm"
					sx={{ textAlign: "center" }}>
					<AssignmentCreationForm />
				</Container>
			</Box>
		</Box>
	);
};

export default AssignmentCreation;
