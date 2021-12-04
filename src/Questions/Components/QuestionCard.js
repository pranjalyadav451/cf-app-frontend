import React from "react";
import CustomButton from "../../Shared/UIElements/CustomButton";

import "../../Styles/QuestionCard.css";

const CUSTOM_STYLE_FOR_BOTTOM_BUTTONS = {
	width: "40%",
};

const QuestionCard = (props) => {
	console.log(props);
	const { questionName, questionIndex, questionRating, questionLink } = props;
	return (
		<div className="card">
			<div className="content">
				<div className="header">{questionName}</div>
				<div className="ui fitted divider"></div>
				<div className="ui two statistics">
					<div className="ui mini blue statistic">
						<div className="label">Problem</div>
						<div className="text value">{questionIndex}</div>
					</div>
					<div className="ui mini violet statistic">
						<div className="label">Rating</div>
						<div className="text value">{questionRating}</div>
					</div>
				</div>
			</div>
			<div className="bottom-buttons">
				<CustomButton
					target="blank"
					style={CUSTOM_STYLE_FOR_BOTTOM_BUTTONS}
					forPath={questionLink}
					description="Solve"
				>
					Approve
				</CustomButton>
			</div>
		</div>
	);
};

export default QuestionCard;
