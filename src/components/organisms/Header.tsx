import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AtomIconButton from "../atoms/AtomIconButton";
import AtomTypography from "../atoms/AtomTypography";
import AtomButton from "../atoms/AtomButton";
import MoleculeMenu from "../molecules/MoleculeMenu";
import { Search, SearchIconWrapper, StyledInputBase } from "./Header.styles";
import { removeSignin, saveSignin } from "../../redux/slices/authSlice";
import { IAuthSateProp } from "../../interfaces/stateInterface";
import useInstructor from "../../hooks/useInstructor";

const Header = () => {
	const [open, setOpen] = useState(false);
	const [instructorPopper, setInstructorPopper] = useState<null | HTMLElement>(
		null
	);

	const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
		setInstructorPopper(event.currentTarget);
		setOpen(true);
	};

	const handleMouseLeave = () => {
		setOpen(false);
	};

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleSignout = () => {
		dispatch(removeSignin());
	};

	const handleSignoutAndCloseMenu = () => {
		handleSignout();
		handleMenuClose();
	};

	type UserData = {
		success: boolean;
		message: string;
		data?: Object;
		errors?: string[];
	};

	const menuId = "primary-search-account-menu";
	const mobileMenuId = "primary-search-account-menu-mobile";

	const name = useSelector(
		(state: IAuthSateProp) => state.auth?.learnerReference?.name
	);
	const email = useSelector(
		(state: IAuthSateProp) => state.auth?.learnerReference?.email
	);

	const role = useSelector((state: IAuthSateProp) => state.auth.role);
	console.log(role);
	const instructorReference = useSelector(
		(state: IAuthSateProp) => state.auth.instructorReference
	);

	const [showCircularProgress, setShowCircularProgress] = useState(false);
	const [userData, setUserData] = useState<UserData>({
		success: false,
		message: "",
		data: {},
		errors: [],
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { createInstructorProfile } = useInstructor();

	const handleOnClickTeachOnCoursedemyButton = async () => {
		setShowCircularProgress(true);
		const data = {
			name: name,
			email: email,
		};

		const result = await createInstructorProfile(data);
		if (result.error) {
			setShowCircularProgress(false);
			setUserData(result.error.response.data);
		} else {
			setShowCircularProgress(false);
			setUserData(result);
			dispatch(saveSignin(result.data));
			navigate("/instructor-dashboard");
		}
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				sx={{
					backgroundColor: "#ffffff",
					boxShadow: "none",
					borderBottom: "0.5px solid #e5e5e5",
				}}>
				<Toolbar>
					<AtomIconButton
						size="large"
						edge="start"
						color="primary"
						aria-label="open drawer"
						sx={{ mr: 2 }}>
						<MenuIcon />
					</AtomIconButton>
					<AtomTypography
						variant="h6"
						component="div"
						color="primary"
						sx={{ display: { xs: "none", sm: "block" } }}>
						Coursedemy
					</AtomTypography>
					<Search>
						<SearchIconWrapper>
							<SearchIcon color="primary" />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							id="header-search"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<AtomButton
							variant="text"
							onMouseEnter={handleMouseEnter}>
							<Link
								to="/instructor-dashboard"
								style={{ color: "#1976D2", textDecoration: "none" }}>
								{role === "learner" &&
									instructorReference === null &&
									"Teach on CourseDemy"}
								{role === "learner" &&
									instructorReference !== null &&
									"Instructor"}
							</Link>
						</AtomButton>
						<Popper
							id="teach-on-coursedemy-popper"
							open={open}
							anchorEl={instructorPopper}
							onMouseLeave={handleMouseLeave}
							transition
							placement="bottom-end">
							{({ TransitionProps }) => (
								<Fade
									{...TransitionProps}
									timeout={350}>
									<Box
										sx={{
											border: 1,
											p: 1,
											bgcolor: "background.paper",
											width: "250px",
											textAlign: "center",
										}}>
										Turn what you know into an opportunity and reach millions
										around the world
										<AtomButton
											variant="contained"
											fullWidth
											sx={{ mt: 1 }}
											onClick={handleOnClickTeachOnCoursedemyButton}>
											Get Started
										</AtomButton>
									</Box>
								</Fade>
							)}
						</Popper>
						{role === null && (
							<>
								<Link to="/user/signin">
									<AtomButton variant="outlined">Sign in</AtomButton>
								</Link>
								<Link to="learner/signup">
									<AtomButton variant="contained"> Sign up</AtomButton>
								</Link>
							</>
						)}
						{role === "learner" && (
							<>
								<AtomButton variant="text">My Learning</AtomButton>
								<AtomIconButton>
									<FavoriteBorderOutlinedIcon />
								</AtomIconButton>
								<AtomIconButton>
									<ShoppingCartOutlinedIcon />
								</AtomIconButton>
							</>
						)}
						{role !== null && (
							<>
								<AtomIconButton
									size="large"
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="primary">
									<AccountCircle />
								</AtomIconButton>
							</>
						)}
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<AtomIconButton
							size="large"
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="primary">
							<MoreIcon />
						</AtomIconButton>
					</Box>
				</Toolbar>
			</AppBar>

			<MoleculeMenu
				anchorEl={mobileMoreAnchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				id={mobileMenuId}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={isMobileMenuOpen}
				onClose={handleMobileMenuClose}>
				<MenuItem onClick={handleProfileMenuOpen}>Profile</MenuItem>
				<MenuItem onClick={handleSignout}>Sign out</MenuItem>
			</MoleculeMenu>

			<MoleculeMenu
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				id={menuId}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={isMenuOpen}
				onClose={handleMenuClose}>
				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
				<MenuItem onClick={handleSignoutAndCloseMenu}>Sign out</MenuItem>
			</MoleculeMenu>
		</Box>
	);
};

export default Header;
