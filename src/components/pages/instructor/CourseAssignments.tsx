import Box from "@mui/material/Box";
import ClippedDrawer from "../../organisms/ClippedDrawer";
import AssignmentBox from "../../organisms/AssignmentBox";

const CourseAssignments = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<ClippedDrawer />
			<AssignmentBox />
		</Box>
	);
};

export default CourseAssignments;
