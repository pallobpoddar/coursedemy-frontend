import Box from "@mui/material/Box";
import ClippedDrawer from "../../organisms/ClippedDrawer";
import LandingPageBox from "../../organisms/LandingPageBox";

const CourseLandingPage = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<ClippedDrawer />
			<LandingPageBox />
		</Box>
	);
};

export default CourseLandingPage;
