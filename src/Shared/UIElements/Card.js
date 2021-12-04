import React from "react";

const Card = (props) => {
	return (
		<div className="card">
			<div className="content">
				<div className="header">{props.title}</div>
				<div className="ui fitted divider"></div>
				{props.type === "contest" && (
					<div className="ui statistics">
						<div className="ui mini blue statistic">
							<div className="value">{props.division}</div>
							<div className="label">division</div>
						</div>
						<div className="ui mini violet statistic">
							<div className="value">{props.numberOfQues}</div>
							<div className="label">Questions</div>
						</div>
					</div>
				)}

				{props.type === "question" && (
					<div className="ui two statistics">
						<div className="ui mini blue statistic">
							<div className="label">Problem</div>
							<div className="text value">{props.probIndex}</div>
						</div>
						<div className="ui mini violet statistic">
							<div className="label">Rating</div>
							<div className="text value">{props.probRating}</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Card;
