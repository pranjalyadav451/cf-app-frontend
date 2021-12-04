import axios from "axios";
import React, { useCallback, useState } from "react";
import { Pagination, Dimmer, Loader } from "semantic-ui-react";
import ErrorModal from "../../Shared/UIElements/ErrorModal";
import QuestionFilterForm from "../Components/QuestionFilterForm";
import QuestionTableItem from "../Components/QuestionTableItem";

const QuestionTable = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [questionItems, setQuestionItems] = useState(null);

	const pageNumberChangeHandler = (event, { activePage }) => {
		setPageNumber(activePage);
	};

	const getQuestions = useCallback(async (reqObject, page) => {
		setIsLoading(true);
		await axios({
			method: "post",
			url: `/questions/filter/${page}`,
			baseURL: process.env.REACT_APP_BACKEND_URL,
			data: reqObject,
		})
			.then((res) => {
				// console.log(res);
				setQuestionItems(res.data.questions);
			})
			.catch((err) => {
				setError(err);
				console.log(err);
			});
		setIsLoading(false);
	}, []);

	return (
		<div className="flex space-around-contents">
			<div className="vertical-container">
				{isLoading && (
					<Dimmer active className={""} inline={"centered"}>
						<Loader>Getting Questions</Loader>
					</Dimmer>
				)}

				{!isLoading && !error && questionItems && (
					<React.Fragment>
						<table className="ui fluid celled padded table">
							<thead>
								<tr>
									<th>Problem Name</th>
									<th className="center aligned">Rating</th>
									<th className="center aligned">Tags</th>
									<th className="center aligned"></th>
								</tr>
							</thead>
							<tbody>
								{questionItems.map((question) => {
									return (
										<QuestionTableItem
											key={question._id}
											probTitle={question.questionName}
											probIndex={question.questionIndex}
											probRating={question.questionRating}
											probTags={question.questionTags}
											contestId={question.contestId}
											probId={question._id}
										/>
									);
								})}
							</tbody>
						</table>

						<Pagination
							activePage={pageNumber}
							onPageChange={pageNumberChangeHandler}
							pointing
							secondary
							totalPages={pageNumber + 1}
						/>
					</React.Fragment>
				)}

				{error && <ErrorModal message={error.message} />}
			</div>
			<div className="sticky-form" style={{ height: "fit-content" }}>
				<QuestionFilterForm
					pageNumber={pageNumber}
					onFormSubmitHandler={getQuestions}
				/>
			</div>
		</div>
	);
};
export default QuestionTable;
