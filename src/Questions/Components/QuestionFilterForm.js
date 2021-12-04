import { useEffect, useReducer } from "react";
import { Form, Dropdown, Radio, Input, Button } from "semantic-ui-react";
import GLOBAL_ALL_TAGS_PRESENT from "../../Shared/util/AllTagsPresent";
import QUESTION_SORTING_OPTIONS from "../../Shared/util/QuestionSortingOptions";

// todo : use a portal here to get the question tags

const TAGS_OPTIONS = GLOBAL_ALL_TAGS_PRESENT.map((tag) => {
	return {
		key: tag,
		value: tag,
		text: tag,
	};
});

const CUSTOM_STYLE_FOR_SORT_DROPDOWN = {
	padding: "0.5rem 1rem",
};

const minMaxRatingValidator = (value) => {
	return value >= 800 && value <= 4000;
};

const INTIAL_STATE = {
	tagCombination: "AND",
	tagOptions: [],
	excludedTagOptions: [],
	sortingOption: "latestFirst",
	minRating: 800,
	maxRating: 4000,
	onlyUnsolved: true,
	lastContests: 10,
	fetchData: null,
};

const ACTION_ID = {
	TAG_COMBINATION_CHANGE: "tagCombination",
	TAG_OPTIONS_CHANGE: "tagOptions",
	MIN_RATING_CHANGE: "minRating",
	MAX_RATING_CHANGE: "maxRating",
	SORTING_OPTION_CHANGE: "sortingOption",
	TOGGLE_ONLY_UNSOLVED: "onlyUnsolved",
	EXCLUDED_TAG_OPTIONS_CHANGE: "excludedTagOptions",
	LAST_CONTESTS_CHANGE: "lastContests",
};

const formReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE": {
			for (let actionId in ACTION_ID) {
				if (ACTION_ID[actionId] === action.actionId) {
					// console.log(action.actionId);
					return { ...state, [action.actionId]: action.value };
				}
			}
			return state;
		}
		case "FETCH_DATA": {
			console.log(state);
			state.fetchData({ ...state, fetchData: null }, action.pageNumber);
			return state;
		}
		// case "CHECKBOX_CHANGE": {
		//   return { ...state, [action.actionId]: !state[action.actionId] };
		// }
		default: {
			return state;
		}
	}
};

const QuestionFilterForm = (props) => {
	const { pageNumber } = props;
	const [formState, dispatch] = useReducer(formReducer, {
		...INTIAL_STATE,
		fetchData: props.onFormSubmitHandler,
	});

	const onSubmitHandler = (event) => {
		event.preventDefault();
		dispatch({ type: "FETCH_DATA", pageNumber });
	};
	useEffect(() => {
		dispatch({ type: "FETCH_DATA", pageNumber });
	}, [pageNumber]);

	const tagDropdownChangeHandler = (event, { value }) => {
		dispatch({
			type: "CHANGE",
			actionId: ACTION_ID.TAG_OPTIONS_CHANGE,
			value,
		});
	};
	const radioChangeHandler = (event, { value }) => {
		dispatch({
			type: "CHANGE",
			actionId: ACTION_ID.TAG_COMBINATION_CHANGE,
			value,
		});
	};

	const minRatingChangeHandler = (event) => {
		dispatch({
			type: "CHANGE",
			actionId: ACTION_ID.MIN_RATING_CHANGE,
			value: event.target.value,
		});
	};
	const maxRatingChangeHandler = (event) => {
		dispatch({
			type: "CHANGE",
			actionId: ACTION_ID.MAX_RATING_CHANGE,
			value: event.target.value,
		});
	};
	const sortingOptionChangeHandler = (event, { value }) => {
		// console.log(value);
		dispatch({
			type: "CHANGE",
			actionId: ACTION_ID.SORTING_OPTION_CHANGE,
			value: value,
		});
	};
	// const onlyUnsolvedToggleHandler = (event, { value }) => {
	//   console.log(event.target.value, value);
	//   dispatch({
	//     type: "CHECKBOX_CHANGE",
	//     actionId: ACTION_ID.TOGGLE_ONLY_UNSOLVED,
	//   });
	// };
	const excludedTagOptionsChangeHandler = (event, { value }) => {
		dispatch({
			type: "CHANGE",
			actionId: ACTION_ID.EXCLUDED_TAG_OPTIONS_CHANGE,
			value,
		});
	};
	const lastContestsChangeHandler = (event, { value }) => {
		dispatch({
			type: "CHANGE",
			actionId: ACTION_ID.LAST_CONTESTS_CHANGE,
			value: event.target.value,
		});
	};

	return (
		<div className="center-flex filter-form">
			<Form onSubmit={onSubmitHandler}>
				<Form.Field>
					<Dropdown
						className="add-border"
						clearable
						fluid
						search
						multiple
						selection
						value={formState.tagOptions}
						onChange={tagDropdownChangeHandler}
						options={TAGS_OPTIONS}
						text={"Select Tags"}
					/>
				</Form.Field>

				<Form.Field>
					<Radio
						label="Combine Tags by 'OR'"
						name="radioGroup"
						value="OR"
						checked={formState.tagCombination === "OR"}
						onChange={radioChangeHandler}
					/>
				</Form.Field>
				<Form.Field>
					<Radio
						label="Combine Tags by 'AND'"
						name="radioGroup"
						value="AND"
						checked={formState.tagCombination === "AND"}
						onChange={radioChangeHandler}
					/>
				</Form.Field>

				<Form.Field>
					<Input
						size="mini"
						min={800}
						max={4000}
						className={
							minMaxRatingValidator(formState.minRating)
								? ""
								: "danger-input"
						}
						label="Min Rating"
						type="number"
						value={formState.minRating}
						onChange={minRatingChangeHandler}
					/>
				</Form.Field>
				<Form.Field>
					<Input
						size="mini"
						min={800}
						max={4000}
						className={
							minMaxRatingValidator(formState.maxRating)
								? ""
								: "danger-input"
						}
						label="Max Rating"
						type="number"
						value={formState.maxRating}
						onChange={maxRatingChangeHandler}
					/>
				</Form.Field>
				{/* <Form.Field>*/}
				{/*  <Checkbox*/}
				{/*    toggle*/}
				{/*    label="Only Unsolved Questions"*/}
				{/*    value="onlyUnsolved"*/}
				{/*    onChange={onlyUnsolvedToggleHandler}*/}
				{/*    checked={formState.onlyUnsolved}*/}
				{/*  />*/}
				{/*</Form.Field> */}

				<Form.Field>
					<span>Sort By -:</span>
					<Dropdown
						className="add-border"
						style={CUSTOM_STYLE_FOR_SORT_DROPDOWN}
						fluid
						onChange={sortingOptionChangeHandler}
						value={formState.sortingOption}
						options={QUESTION_SORTING_OPTIONS}
					/>
				</Form.Field>
				<Form.Field>
					<Dropdown
						className="add-border"
						clearable
						fluid
						search
						multiple
						selection
						value={formState.excludedTagOptions}
						onChange={excludedTagOptionsChangeHandler}
						options={TAGS_OPTIONS}
						text={"Exclude Tags"}
					/>
				</Form.Field>
				<Form.Field>
					<span>Choose Questions from last 'X' contests</span>
					<Input
						size="mini"
						min={1}
						max={1600}
						type="number"
						className="add-border"
						placeholder="'X'"
						value={formState.lastContests}
						onChange={lastContestsChangeHandler}
					/>
				</Form.Field>
				<Button>Submit</Button>
			</Form>
		</div>
	);
};
export default QuestionFilterForm;
