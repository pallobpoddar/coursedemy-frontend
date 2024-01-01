import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(() => ({
	position: "relative",
	border: "1px solid #5c5c5fde",
	borderRadius: "50px",
	width: "50%",
}));

const SearchIconWrapper = styled("div")(() => ({
	padding: "20px",
	height: "100%",
	position: "absolute",
	display: "flex",
	alignItems: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "primary",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(6)})`,
	},
}));

export { Search, SearchIconWrapper, StyledInputBase };
