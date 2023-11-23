import Skeleton from "@mui/material/Skeleton";

type Props = {
	variant?: "circular" | "rectangular" | "rounded" | "text";
	animation?: "pulse" | "wave" | false;
	width?: number | string;
	height?: number | string;
};

const AtomSkeleton = (props: Props) => {
	return <Skeleton {...props} />;
};

export default AtomSkeleton;
