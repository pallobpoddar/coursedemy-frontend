import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import AtomTypography from "../atoms/AtomTypography";
import { Link } from "react-router-dom";

type Props = {
	typography: string;
	link: string;
};

const InstructorPageHeader = (props: Props) => {
	return (
		<AppBar
			position="fixed"
			sx={{
				backgroundColor: "#ffffff",
				boxShadow: "none",
			}}>
			<Toolbar>
				<ArrowBackIosNewOutlinedIcon
					color="primary"
					fontSize="small"
					sx={{ mr: 1 }}
				/>
				<Link
					to={props.link}
					style={{ textDecoration: "none" }}>
					<AtomTypography
						variant="h6"
						component="div"
						color="primary"
						sx={{ display: { xs: "none", sm: "block" } }}>
						{props.typography}
					</AtomTypography>
				</Link>

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
	);
};

export default InstructorPageHeader;
