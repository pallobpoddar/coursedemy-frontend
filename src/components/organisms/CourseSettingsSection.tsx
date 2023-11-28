import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import AtomTypography from "../atoms/AtomTypography";
import AtomButton from "../atoms/AtomButton";
import { useState } from "react";
import useCourse from "../../hooks/useCourse";
import { useParams } from "react-router-dom";
import AtomAlert from "../atoms/AtomAlert";
import AtomCircularProgress from "../atoms/AtomCircularProgress";

const CourseSettingsSection = () => {
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

	const { sendPublicationRequest } = useCourse();
	const { courseReference } = useParams();

	const handlerOnSubmit = async () => {
		setShowCircularProgress(true);
		const formData = {
			courseReference: courseReference,
		};
		const result = await sendPublicationRequest(formData);
		if (result.error) {
			setShowCircularProgress(false);
			setCourseData(result.error.response.data);
		} else {
			setShowCircularProgress(false);
			setCourseData(result);
		}
	};
	return (
		<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
			<Toolbar />
			<Paper
				elevation={3}
				sx={{
					width: "100%",
					minHeight: "100vh",
				}}
			>
				<Box
					sx={{
						width: "100%",
						height: "100px",
						border: "0.5px solid #e5e5e5",
						paddingLeft: "40px",
						display: "flex",
						alignItems: "center",
					}}
				>
					<AtomTypography component="h1" variant="h5">
						Settings
					</AtomTypography>
				</Box>
				<Box
					p={3}
					display="flex"
					flexDirection="column"
					gap="30px"
					pl={5}
					pr={5}
				>
					{courseData.message !== "" && (
						<AtomAlert
							variant="filled"
							severity={
								courseData.success === true
									? "success"
									: "error"
							}
							sx={{ mt: 1, width: "100%" }}
						>
							{courseData.message}
						</AtomAlert>
					)}
					<AtomTypography component="p" variant="body1">
						<strong>Course Status</strong>
					</AtomTypography>
				</Box>
				<Box display="flex" flexDirection="column" width="30%" gap={3}>
					<AtomButton
						variant="contained"
						color="primary"
						sx={{ ml: 5 }}
						onClick={handlerOnSubmit}
					>
						{showCircularProgress === true ? (
							<AtomCircularProgress color="inherit" size={25} />
						) : (
							<>Submit for Review</>
						)}
					</AtomButton>
					<AtomButton
						variant="contained"
						color="error"
						sx={{ ml: 5 }}
					>
						Delete
					</AtomButton>
				</Box>
			</Paper>
		</Box>
	);
};

export default CourseSettingsSection;
