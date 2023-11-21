import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AtomTypography from "../atoms/AtomTypography";
import { Link } from "react-router-dom";

const InstructorPageHeader = () => {
	return (
		<div>
			<AppBar
				position="fixed"
				sx={{
					backgroundColor: "#ffffff",
					boxShadow: "none",
				}}>
				<Toolbar>
					<AtomTypography
						variant="h6"
						component="div"
						color="primary"
						sx={{ display: { xs: "none", sm: "block" } }}>
						Coursedemy
					</AtomTypography>

					<AtomTypography
						color="primary"
						component="p"
						variant="body1"
						sx={{ flex: "1", textAlign: "right", mr: 10 }}>
						<Link
							to="/"
							style={{ textDecoration: "none", color: "#1976D2" }}>
							Student
						</Link>
					</AtomTypography>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default InstructorPageHeader;
