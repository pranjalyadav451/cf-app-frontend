import React from "react";
const INITIAL_USER_CONTEXT = {
	isLoggedIn: false,
	userHandle: "",
	userData: {
		solvedQuestionsList: [],
		attemptedQuestionsList: [],
		attemptedContestsList: [],
	},
	error: null,
	onError: () => {},
	setUserData: () => {},
	login: () => {},
};

export const UserContext = React.createContext(INITIAL_USER_CONTEXT);
