import CircularProgress from "@mui/material/CircularProgress";

type Props = {
	color?:
		| "inherit"
		| "primary"
		| "secondary"
		| "error"
		| "info"
		| "success"
		| "warning";
	size?: number | string;
};

const AtomCircularProgress = (props: Props) => {
	return <CircularProgress {...props}></CircularProgress>;
};

export default AtomCircularProgress;
