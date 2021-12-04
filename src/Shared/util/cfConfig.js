const cfConfig = {
	baseURL: "https://codeforces.com/api/",
	baseContestLink: "http://codeforces.com/contest/",
	baseProbLink: "https://codeforces.com/problemset/problem/",
};
const methods = {
	contestList: "contest.list",
	blogComments: "blogEntry.comments",
	blogView: "blogEntry.view",
	contestHacks: "contest.hacks",
	contestRatingChanges: "contest.ratingChanges",
	contestStandings: "contest.standings",
	contestStatus: "contest.status",
	problemSet: "problemset.problems",
	problemSetRecentStatus: "problemset.recentStatus",
	userStatus: "user.status",
	userInfo: "user.info",
	userRatedList: "user.ratedList",
	userRating: "user.rating",
};

export { cfConfig, methods };
