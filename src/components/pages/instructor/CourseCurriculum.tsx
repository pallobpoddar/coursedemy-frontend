import Box from "@mui/material/Box";
import ClippedDrawer from "../../organisms/ClippedDrawer";
import CurriculumBox from "../../organisms/CurriculumBox";

const CourseCurriculum = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<ClippedDrawer />
			<CurriculumBox />
		</Box>
	);
};

export default CourseCurriculum;
