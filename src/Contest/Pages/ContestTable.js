import React, { useCallback, useEffect, useState } from "react";
import ContestTableItem from "../Components/ContestTableItem";
import { Pagination, Dimmer, Loader } from "semantic-ui-react";
import axios from "axios";
import ErrorModal from "../../Shared/UIElements/ErrorModal";

const ContestTable = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [contestItems, setContestItems] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function pageNumberChangeHandler(event, { activePage }) {
		setPageNumber(activePage);
	}

	const getAllContests = useCallback(async (pageNumber) => {
		setIsLoading(true);
		await axios({
			baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
			url: `/contests/all/${pageNumber}`,
		})
			.then((res) => {
				setContestItems(res.data.contests);
				// console.log(contestItems);
			})
			.catch((err) => {
				setError(err);
			});
		setIsLoading(false);
	}, []);

	useEffect(() => {
		// const getAllContests = async () => {
		// 	setIsLoading(true);
		// 	await axios({
		// 		baseURL: "http://localhost:5000/api",
		// 		url: `/contests/all/${pageNumber}`,
		// 	})
		// 		.then((res) => {
		// 			setContestItems(res.data.contests);
		// 		})
		// 		.catch((err) => {
		// 			setError(err);
		// 		});
		// 	setIsLoading(false);
		// };
		// getAllContests();
		getAllContests(pageNumber);
	}, [pageNumber, getAllContests]);

	return (
		<div className="flex">
			<div className={"vertical-container"}>
				{isLoading && (
					<Dimmer active className={""} inline={"centered"}>
						<Loader>Getting Contests </Loader>
					</Dimmer>
				)}
				{!isLoading && !error && contestItems && (
					<React.Fragment>
						<table className="ui celled padded table">
							<thead>
								<tr>
									<th>Contest</th>
									<th className="center aligned">
										Number of Questions
									</th>
									<th className="center aligned"></th>
								</tr>
							</thead>
							<tbody>
								{contestItems.map((contest) => {
									return (
										<ContestTableItem
											key={contest._id}
											contestId={contest.contestId}
											title={contest.contestName}
											division={contest.contestDivision}
											numberOfQues={
												contest.contestQuestions.length
											}
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

			{/*<div className="sticky-form" style={{ height: "fit-content" }}>*/}
			{/*	<ContestFilterForm />*/}
			{/*</div>*/}
		</div>
	);
};
export default ContestTable;
