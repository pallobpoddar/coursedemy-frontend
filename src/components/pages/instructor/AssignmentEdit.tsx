import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InstructorPageHeader from "../../organisms/InstructorPageHeader";
import AssignmentEditForm from "../../organisms/AssignmentEditForm";
import AssignmentDeleteButton from "../../organisms/AssignmentDeleteButton";

const AssignmentEdit = () => {
	const { courseReference } = useParams();
	return (
		<Box>
			<InstructorPageHeader
				typography="Back to Assignments"
				link={`/instructor/course/${courseReference}/assignments`}
			/>
			<AssignmentDeleteButton />
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Container maxWidth="sm" sx={{ textAlign: "center" }}>
					<AssignmentEditForm />
				</Container>
			</Box>
		</Box>
	);
};

export default AssignmentEdit;
