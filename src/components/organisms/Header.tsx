import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
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
import { removeSignin } from "../../redux/slices/authSlice";
import { IAuthSateProp } from "../../interfaces/stateInterface";

const Header = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		React.useState<null | HTMLElement>(null);

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

	const menuId = "primary-search-account-menu";
	const mobileMenuId = "primary-search-account-menu-mobile";

	const role = useSelector((state: IAuthSateProp) => state.auth.role);
	const instructorReference = useSelector(
		(state: IAuthSateProp) => state.auth.instructorReference
	);
	const dispatch = useDispatch();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				sx={{
					backgroundColor: "#ffffff",
					boxShadow: "none",
					borderBottom: "0.5px solid #e5e5e5",
				}}
			>
				<Toolbar>
					<AtomIconButton
						size="large"
						edge="start"
						color="primary"
						aria-label="open drawer"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</AtomIconButton>
					<AtomTypography
						variant="h6"
						component="div"
						color="primary"
						sx={{ display: { xs: "none", sm: "block" } }}
					>
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
						<AtomButton variant="text">
							<Link
								to="/instructor/signup"
								style={{
									color: "#1976d2",
									textDecoration: "none",
								}}
							>
								{role === "learner" &&
									instructorReference === null &&
									"Teach on CourseDemy"}
								{role === "learner" &&
									instructorReference !== null &&
									"Instructor"}
							</Link>
						</AtomButton>
						{role === null && (
							<>
								<Link to="/user/signin">
									<AtomButton variant="outlined">
										Sign in
									</AtomButton>
								</Link>
								<Link to="learner/signup">
									<AtomButton variant="contained">
										{" "}
										Sign up
									</AtomButton>
								</Link>
							</>
						)}
						{role === "learner" && (
							<>
								<AtomButton variant="text">
									My Learning
								</AtomButton>
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
									color="primary"
								>
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
							color="primary"
						>
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
				onClose={handleMobileMenuClose}
			>
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
				onClose={handleMenuClose}
			>
				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
				<MenuItem onClick={handleSignoutAndCloseMenu}>
					Sign out
				</MenuItem>
			</MoleculeMenu>
		</Box>
	);
};

export default Header;
