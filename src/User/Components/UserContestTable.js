import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { UserContext } from "../../Shared/Context/UserContext";
import ContestTableItem from "../../Contest/Components/ContestTableItem";
import { getContestLink } from "../../Shared/util/getLinks";
import { Dimmer, Loader } from "semantic-ui-react";
import ErrorModal from "../../Shared/UIElements/ErrorModal";

const UserContestTable = () => {
	const user = useContext(UserContext);
	const [contestItems, setContestItems] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const processUserContest = (allContests) => {
			const contestItemsList = user.userData.attemptedContestsList;
			console.log(contestItemsList, allContests);

			let contestItemsSet = new Set(contestItemsList);
			let result = [];
			for (let contest of allContests) {
				if (contestItemsSet.has(contest.id)) {
					let processedContest = {
						contestId: contest.id,
						contestName: contest.name,
						contestLink: getContestLink(contest.id),
					};
					result.push(processedContest);
				}
			}
			setContestItems(result);
		};

		const getAllContests = async () => {
			setIsLoading(true);
			await axios({
				baseURL: "http://codeforces.com/api",
				url: "/contest.list/",
			})
				.then((res) => {
					processUserContest(res.data.result);
				})
				.catch((err) => {
					setError(err);
				});
			setIsLoading(false);
		};
		getAllContests();
	}, [user]);

	return (
		<div className="flex">
			{isLoading && (
				<Dimmer active className={""} inline={"centered"}>
					<Loader>
						Processing User Submissions to get Contests!!
					</Loader>
				</Dimmer>
			)}
			{!isLoading && !error && contestItems && (
				<table className="ui celled padded table">
					<thead>
						<tr>
							<th>Contest</th>
							<th className="center aligned"></th>
						</tr>
					</thead>
					<tbody>
						{contestItems.map((contest) => {
							return (
								<ContestTableItem
									className={"green-background"}
									isUserContest={true}
									key={contest.contestId}
									contestId={contest.contestId}
									title={contest.contestName}
									contestLink={contest.contestLink}
								/>
							);
						})}
					</tbody>
				</table>
			)}

			{error && <ErrorModal message={error.message} />}
		</div>
	);
};
export default UserContestTable;
