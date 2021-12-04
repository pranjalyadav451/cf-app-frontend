import React from "react";
import CustomButton from "../../Shared/UIElements/CustomButton";
import { getProbLink } from "../../Shared/util/getLinks";
import { Label } from "semantic-ui-react";

const STYLE_FIX_TO_CENTER_BUTTONS = {
	width: "100%",
};

// todo : change the 'forPath' props
// todo : look at the props object and use all the props effectively.

const QuestionTableItem = (props) => {
	// console.log(props);
	const { isUserQuestion, dateAttempted } = props;
	return (
		<tr className={props.className}>
			<td>
				<Label>
					<h4>{props.probTitle}</h4>
				</Label>
			</td>
			<td className="center aligned">
				<Label>{props.probRating}</Label>
			</td>

			<td className="center aligned">
				{props.probTags.map((tag) => {
					return <Label key={tag}>{tag}</Label>;
				})}
			</td>
			{isUserQuestion ? (
				<td className="center aligned">
					<Label>{dateAttempted}</Label>
				</td>
			) : null}
			<td className="center aligned">
				<CustomButton
					target="blank"
					style={STYLE_FIX_TO_CENTER_BUTTONS}
					forPath={getProbLink(props.contestId, props.probIndex)}
					description="Solve"
				/>
			</td>
		</tr>
	);
};
export default QuestionTableItem;
