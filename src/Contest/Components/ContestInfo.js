import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import QuestionCard from "../../Questions/Components/QuestionCard";
import axios from "axios";
import { Loader, Dimmer } from "semantic-ui-react";
import ErrorModal from "../../Shared/UIElements/ErrorModal";

const ContestInfo = () => {
	let { contestId } = useParams();

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [contestInfo, setContestInfo] = useState(null);

	const getContestInfoById = useCallback(async () => {
		setIsLoading(true);
		await axios({
			baseURL: "http://localhost:5000/api",
			url: `/contests/${contestId}`,
		})
			.then((res) => {
				console.log(res);
				setContestInfo(res.data.contestInfo);
			})
			.catch((err) => {
				setError(err);
			});
		setIsLoading(false);
	}, [contestId]);

	useEffect(() => {
		getContestInfoById();
	}, [getContestInfoById]);

	return (
		<div>
			{isLoading && (
				<Dimmer active className={""} inline={"centered"}>
					<Loader>Getting Contest Info </Loader>
				</Dimmer>
			)}
			{!isLoading && !error && contestInfo && (
				<div className="ui stackable cards">
					{contestInfo.map((question) => {
						return (
							<QuestionCard
								key={question.id}
								questionName={question.questionName}
								contestId={contestId}
								questionRating={question.questionRating}
								questionPoints={question.questionPoints}
								questionIndex={question.questionIndex}
								questionLink={question.questionLink}
							/>
						);
					})}
				</div>
			)}
			{error && <ErrorModal message={error.message} />}
		</div>
	);
};
export default ContestInfo;
