import { cfConfig } from "./cfConfig";

const is_valid = (item) => {
	if (item !== null && item !== undefined && item !== "") return true;
	return false;
};

const getContestLink = (contestId) => {
	if (is_valid(contestId)) {
		let contestLink = cfConfig.baseContestLink + contestId;
		return contestLink;
	}
};

const getProbLink = (contestId, probIndex) => {
	if (is_valid(contestId) && is_valid(probIndex)) {
		let probLink = cfConfig.baseProbLink + `${contestId}/${probIndex}`;
		// console.log(probLink);
		return probLink;
	}
};
export { getProbLink, getContestLink };
