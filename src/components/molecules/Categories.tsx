import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useCategory from "../../hooks/useCategory";

type Props = {
	onUpdate?: (category: string | null) => Promise<void>;
};

const Categories = (props: Props) => {
	type Category = {
		_id: string;
		name: string;
	};

	const [open, setOpen] = useState(false);
	const [categoryOptions, setCategoryOptions] = useState<readonly Category[]>(
		[]
	);

	const { getCategories } = useCategory();

	useEffect(() => {
		const getCategoriesFromApi = async () => {
			try {
				const result = await getCategories();
				setCategoryOptions(result.data.result);
			} catch (error) {
				console.error("Error setting data:", error);
			}
		};

		getCategoriesFromApi();
	}, []);

	return (
		<Autocomplete
			id="category-autocomplete"
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			isOptionEqualToValue={(option, value) => option.name === value.name}
			getOptionLabel={(option) => option.name}
			options={categoryOptions}
			onChange={(_, newValue) => {
				props.onUpdate?.(newValue && newValue._id);
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Choose a category"
				/>
			)}
		/>
	);
};

export default Categories;
