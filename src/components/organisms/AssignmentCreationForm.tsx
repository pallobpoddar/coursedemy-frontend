import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import MoleculeTextField from "../molecules/MoleculeTextField";
import AtomButton from "../atoms/AtomButton";
import AtomCircularProgress from "../atoms/AtomCircularProgress";
import AtomAlert from "../atoms/AtomAlert";
import Input from "@mui/material/Input";
import AtomTypography from "../atoms/AtomTypography";
import useAssignment from "../../hooks/useAssignment";

const AssignmentCreationForm = () => {
	type AssignmentData = {
		success: boolean;
		message: string;
		data?: Object;
		errors?: string[];
	};

	const [showCircularProgress, setShowCircularProgress] = useState(false);
	const [assignmentData, setAssignmentData] = useState<AssignmentData>({
		success: false,
		message: "",
		data: {},
		errors: [],
	});
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const handleFileChange = (event: any) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	const { createAssignment } = useAssignment();
	const navigate = useNavigate();

	const { courseReference } = useParams();

	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
	} = useForm({
		mode: "onChange",
		defaultValues: {
			title: "",
		},
	});

	const handlerOnSubmit = async () => {
		setShowCircularProgress(true);
		const formData = {
			courseReference: courseReference,
			title: getValues("title"),
			assignment: selectedFile,
		};

		const result = await createAssignment(formData);
		if (result.error) {
			setShowCircularProgress(false);
			setAssignmentData(result.error.response.data);
		} else {
			setShowCircularProgress(false);
			setAssignmentData(result);
			navigate(`/instructor/course/${courseReference}/assignments`);
		}
	};

	return (
		<Box>
			<AtomTypography
				component="h1"
				variant="h4">
				Create Assignment
			</AtomTypography>
			<Box
				component="form"
				onSubmit={handleSubmit(handlerOnSubmit)}>
				{assignmentData.message !== "" && (
					<AtomAlert
						variant="filled"
						severity="error"
						sx={{ mt: 1, width: "100%" }}>
						{assignmentData.message}
					</AtomAlert>
				)}
				<Controller
					name="title"
					control={control}
					rules={{
						maxLength: {
							value: 100,
							message: "Character limit exceeded",
						},
					}}
					render={({ field }) => (
						<MoleculeTextField
							margin="normal"
							required
							fullWidth
							id="title"
							label={errors.title ? errors.title.message : "Title"}
							autoComplete="tile"
							field={field}
							error={errors.title ? true : false}
							sx={{ mb: 4 }}
						/>
					)}
				/>

				<Box
					mt={2}
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					border="0.5px solid gray"
					p={1}>
					<Box paddingLeft={2}>
						<AtomTypography
							component="p"
							variant="body1">
							{selectedFile ? selectedFile.name : "No file selected"}
						</AtomTypography>
					</Box>

					<Box display="flex">
						<Box
							borderLeft="0.5px solid gray"
							mr={1}
							sx={{
								"&:hover": {
									bgcolor: "#d2d5d8",
								},
							}}>
							<label htmlFor="file-input">
								<AtomButton
									variant="text"
									color="inherit"
									component="span">
									Select file
									<Input
										id="file-input"
										type="file"
										style={{
											display: "none",
										}}
										onChange={handleFileChange}
									/>
								</AtomButton>
							</label>
						</Box>
					</Box>
				</Box>

				<AtomButton
					type="submit"
					variant="contained"
					fullWidth
					onClick={handlerOnSubmit}
					sx={{ mt: 3, mb: 2 }}>
					{showCircularProgress === true ? (
						<AtomCircularProgress
							color="inherit"
							size={25}
						/>
					) : (
						<>Save</>
					)}
				</AtomButton>
			</Box>
		</Box>
	);
};

export default AssignmentCreationForm;
