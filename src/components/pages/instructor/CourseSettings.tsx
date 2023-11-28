import Box from "@mui/material/Box";
import ClippedDrawer from "../../organisms/ClippedDrawer";
import CourseSettingsSection from "../../organisms/CourseSettingsSection";

const CourseSettings = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<ClippedDrawer />
			<CourseSettingsSection />
		</Box>
	);
};

export default CourseSettings;
