import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AtomTypography from "../atoms/AtomTypography";
import { Link } from "react-router-dom";
import AtomButton from "../atoms/AtomButton";

const InstructorDashboardCourseList = () => {
	const DrawerHeader = styled("div")(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	}));

	return (
		<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
			<DrawerHeader />
			<Container maxWidth="xl">
				<Paper
					elevation={2}
					sx={{
						width: "100%",
						height: "15vh",
						display: "flex",
						alignItems: "center",
					}}
				>
					<Grid container spacing={2}>
						<Grid item xs={6} textAlign="center">
							<AtomTypography component="p" variant="body1">
								Jump Into Course Creation
							</AtomTypography>
						</Grid>
						<Grid item xs textAlign="center">
							<Link to="/instructor/course/create">
								<AtomButton variant="contained">
									Create Your Course
								</AtomButton>
							</Link>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</Box>
	);
};

export default InstructorDashboardCourseList;
