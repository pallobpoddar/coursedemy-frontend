import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AtomTypography from "../atoms/AtomTypography";
import AtomButton from "../atoms/AtomButton";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const CourseList = () => {
	return (
		<>
			<AtomTypography
				component="h2"
				variant="h5">
				Recommended for you
			</AtomTypography>
			<Container
				sx={{ py: 8 }}
				maxWidth="md">
				<Grid
					container
					spacing={4}>
					{cards.map((card) => (
						<Grid
							item
							key={card}
							xs={12}
							sm={6}
							md={4}>
							<Card
								sx={{
									height: "100%",
									display: "flex",
									flexDirection: "column",
								}}>
								<CardMedia
									component="div"
									sx={{
										pt: "56.25%",
									}}
									image="https://source.unsplash.com/random?wallpapers"
								/>
								<CardContent sx={{ flexGrow: 1 }}>
									<AtomTypography
										gutterBottom
										variant="h5"
										component="h2">
										Heading
									</AtomTypography>
									<Typography>
										This is a media card. You can use this section to describe
										the content.
									</Typography>
								</CardContent>
								<CardActions>
									<AtomButton size="small">View</AtomButton>
									<AtomButton size="small">Edit</AtomButton>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	);
};

export default CourseList;
