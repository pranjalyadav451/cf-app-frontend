import { useState } from "react";
import { Form, Dropdown, Button } from "semantic-ui-react";

const contestTypeOptions = [
	{
		key: 3,
		value: 3,
		text: "Div 3",
	},
	{
		key: 2,
		value: 2,
		text: "Div 2",
	},
	{
		key: 1,
		value: 1,
		text: "Div 1",
	},
	{
		key: "global",
		value: "global",
		text: "Global Round",
	},
	// todo : add more options
];

const contestSortingOptions = [
	{
		key: "1",
		text: "Rating : High to Low",
		value: "highToLow",
	},
	{
		key: "2",
		text: "Rating : High to Low",
		value: "lowToHigh",
	},
	{
		key: "3",
		text: "Recency : Latest First",
		value: "latestFirst",
	},
	{
		key: "4",
		text: "Recency : Earliest First",
		value: "earliestFirst",
	},
];
// todo : change this to proper types

const CUSTOM_STYLE_FOR_SORT_DROPDOWN = {
	padding: ".5rem 1rem",
};

const ContestFilterForm = () => {
	const [divDropdownOptions, setDivDropdownOptions] = useState([]);
	const [sortDropdownOptions, setSortDropdownOptions] = useState(
		contestSortingOptions[0].value
	);

	const divDropdownChangeHandler = (event, { value }) => {
		setDivDropdownOptions(value);
	};
	const sortDropdownChangeHandler = (event, { value }) => {
		setSortDropdownOptions(value);
	};

	const formSubmitHandler = (event) => {
		event.preventDefault();
		const reqObject = {
			divDropdownOptions,
			sortDropdownOptions,
		};
		console.log(reqObject);
	};

	return (
		<div className="center-flex filter-form">
			<Form onSubmit={formSubmitHandler}>
				<Form.Field>
					<Dropdown
						className="add-border"
						clearable
						fluid
						selection
						multiple
						value={divDropdownOptions}
						onChange={divDropdownChangeHandler}
						options={contestTypeOptions}
						placeholder={"Select Your Division"}
					/>
				</Form.Field>

				<Form.Field>
					<p style={{ margin: 0 }}>Sort By -:</p>
					<Dropdown
						className="add-border"
						style={CUSTOM_STYLE_FOR_SORT_DROPDOWN}
						fluid
						value={sortDropdownOptions}
						onChange={sortDropdownChangeHandler}
						options={contestSortingOptions}
					/>
				</Form.Field>
				<Button>Submit</Button>
			</Form>
		</div>
	);
};
export default ContestFilterForm;
