import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import AtomTypography from "../atoms/AtomTypography";

type Props = {};

const CourseCurriculum = (props: Props) => {
	return (
		<Box
			component="main"
			sx={{ flexGrow: 1, p: 3 }}>
			<Toolbar />
			<Paper
				elevation={3}
				sx={{
					width: "100%",
					height: "100vh",
				}}>
				<Box
					sx={{
						width: "100%",
						height: "15%",
						border: "0.5px solid #e5e5e5",
						paddingLeft: "40px",
						display: "flex",
						alignItems: "center",
					}}>
					<AtomTypography
						component="h1"
						variant="h5">
						Curriculum
					</AtomTypography>
				</Box>
			</Paper>
		</Box>
	);
};

export default CourseCurriculum;
