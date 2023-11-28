import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import PublicationRequestSection from "../../organisms/PublicationRequestSection";

const PublicationRequest = () => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				minHeight: "100vh",
			}}
		>
			<Container component="main" maxWidth="xs">
				<PublicationRequestSection />
			</Container>
		</Box>
	);
};

export default PublicationRequest;
