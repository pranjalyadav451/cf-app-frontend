const processUserData = (data) => {
	const attemptedQuestionsSet = new Set(),
		solvedQuestionsSet = new Set(),
		attemptedContestsSet = new Set();

	for (let submission of data) {
		// Todo: take care of this here.
		attemptedContestsSet.add(submission.contestId);

		let tempQuestionId = submission.contestId + submission.problem.index;
		attemptedQuestionsSet.add(tempQuestionId);
		if (submission.verdict === "OK") {
			solvedQuestionsSet.add(tempQuestionId);
		}
	}

	const solvedQuestionsList = [],
		attemptedQuestionsList = [];
	for (let submission of data) {
		let { problem } = submission;
		let processedSubmission = {
			tempQuestionId: submission.contestId + problem.index,
			contestId: submission.contestId,
			questionIndex: problem.index,
			questionName: problem.name,
			questionRating: problem.rating,
			questionTags: problem.tags,
			lastAttemptedTime: new Date(submission.creationTimeSeconds * 1000),
			lastAttemptedDate: new Date(
				submission.creationTimeSeconds * 1000
			).toLocaleDateString("en-GB"),
			solved: submission.verdict === "OK" ? true : false,
		};
		if (solvedQuestionsSet.has(processedSubmission.tempQuestionId)) {
			solvedQuestionsList.push(processedSubmission);
			solvedQuestionsSet.delete(processedSubmission.tempQuestionId);
		}

		if (attemptedQuestionsSet.has(processedSubmission.tempQuestionId)) {
			attemptedQuestionsList.push(processedSubmission);
			attemptedQuestionsSet.delete(processedSubmission.tempQuestionId);
		}
	}
	const attemptedContestsList = [...attemptedContestsSet];
	return {
		attemptedContestsList,
		attemptedQuestionsList,
		solvedQuestionsList,
	};
};
export default processUserData;
