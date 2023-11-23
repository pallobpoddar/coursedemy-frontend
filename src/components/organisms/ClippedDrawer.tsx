import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import AtomTypography from "../atoms/AtomTypography";
import useCourse from "../../hooks/useCourse";
import { Course } from "../../interfaces/courseInterface";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AtomButton from "../atoms/AtomButton";
import CourseCurriculum from "./CourseCurriculum";

const drawerWidth = 240;

const ClippedDrawer = () => {
	const { courseReference } = useParams();
	const { getOneByCourseReference } = useCourse();

	const [course, setCourse] = useState<Course>({
		_id: "",
		instructorReference: "",
		title: "",
		isApproved: false,
		categoryReference: "",
	});

	useEffect(() => {
		const getCoursesFromApi = async () => {
			try {
				const result = await getOneByCourseReference(courseReference);
				setCourse(result.data);
			} catch (error) {
				console.error("Error setting data:", error);
			}
		};

		getCoursesFromApi();
	}, []);

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar
				position="fixed"
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
					backgroundColor: "#ffffff",
					boxShadow: "none",
					borderBottom: "0.5px solid #e5e5e5",
				}}>
				<Toolbar>
					<ArrowBackIosNewOutlinedIcon
						color="primary"
						fontSize="small"
						sx={{ mr: 1 }}
					/>
					<AtomTypography
						variant="body1"
						component="div"
						color="primary"
						sx={{ mr: 5 }}>
						Back to courses
					</AtomTypography>
					<AtomTypography
						variant="body1"
						component="div"
						color="primary"
						sx={{ mr: 5 }}>
						{course.title}
					</AtomTypography>
					<AtomButton variant="text">
						{course.isApproved ? "Published" : "Draft"}
					</AtomButton>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						{["Curriculum"].map((text, index) => (
							<ListItem
								key={text}
								disablePadding>
								<ListItemButton>
									<ListItemIcon>
										{index === 0 && <CircleOutlinedIcon fontSize="small" />}
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>
			<CourseCurriculum courseId={course._id} />
		</Box>
	);
};

export default ClippedDrawer;
