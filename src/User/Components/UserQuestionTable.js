import React, { useContext } from "react";
import { UserContext } from "../../Shared/Context/UserContext";
import QuestionTableItem from "../../Questions/Components/QuestionTableItem";

const UserQuestionTable = () => {
	const user = useContext(UserContext);
	const questionItems = user.userData.attemptedQuestionsList;

	questionItems.sort((a, b) => b.lastAttemptedTime - a.lastAttemptedTime);

	console.log(questionItems);
	return (
		<div className="flex space-around-contents full-width">
			{questionItems.length > 0 && (
				<div className="vertical-container">
					<table className="ui fluid celled padded table">
						<thead>
							<tr>
								<th>Problem Name</th>
								<th className="center aligned">Rating</th>
								<th className="center aligned">Tags</th>
								<th className="center aligned">Solved On</th>
								<th className="center aligned"></th>
							</tr>
						</thead>
						<tbody>
							{questionItems.map((question) => {
								return (
									<QuestionTableItem
										className={
											question.solved
												? "green-background"
												: "yellow-background"
										}
										isUserQuestion={true}
										key={question.tempQuestionId}
										probTitle={question.questionName}
										probIndex={question.questionIndex}
										probRating={question.questionRating}
										probTags={question.questionTags}
										contestId={question.contestId}
										probId={question.tempQuestionId}
										dateAttempted={
											question.lastAttemptedDate
										}
									/>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default UserQuestionTable;
