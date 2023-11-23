import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import AtomTypography from "../atoms/AtomTypography";
import { Link } from "react-router-dom";
import InstructorDashboardCourseList from "./InstructorDashboardCourseList";
import { AppBar, Drawer, DrawerHeader } from "./MiniDrawer.styles";

const MiniDrawer = () => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar
				position="fixed"
				open={open}
				sx={{
					backgroundColor: "#ffffff",
					boxShadow: "none",
				}}>
				<Toolbar>
					<IconButton
						color="primary"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							mr: 5,
							...(open && { display: "none" }),
						}}>
						<MenuIcon />
					</IconButton>

					<Link
						to="/"
						style={{ textDecoration: "none" }}>
						<AtomTypography
							variant="h6"
							component="div"
							color="primary"
							sx={{ display: { xs: "none", sm: "block" } }}>
							Coursedemy
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
			<Drawer
				variant="permanent"
				open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{["Courses"].map((text, index) => (
						<ListItem
							key={text}
							disablePadding
							sx={{ display: "block" }}>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}>
									{index === 0 && <OndemandVideoOutlinedIcon />}
								</ListItemIcon>
								<ListItemText
									primary={text}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			<InstructorDashboardCourseList />
		</Box>
	);
};

export default MiniDrawer;
