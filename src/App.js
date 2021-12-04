import React, { useState, useCallback } from "react";
import NavBar from "./Shared/UIElements/NavBar";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

import ContestTable from "./Contest/Pages/ContestTable";
import ContestInfo from "./Contest/Components/ContestInfo";
import QuestionTable from "./Questions/Pages/QuestionTable";
import UserDashboard from "./User/Pages/UserDashboard";
import { UserContext } from "./Shared/Context/UserContext";

import "./Styles/App.css";
import "./Styles/FilterForm.css";

const App = () => {
	const [userHandle, setUserHandle] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState({
		attemptedQuestionsList: [],
		attemptedContestsList: [],
		solvedQuestionsList: [],
	});
	const [error, setError] = useState(null);

	const login = useCallback((handle, data) => {
		setUserData(data);
		setIsLoggedIn(true);
		setUserHandle(handle);
	}, []);
	const onError = useCallback((message) => {
		setError(message);
		setIsLoggedIn(false);
	}, []);

	return (
		<UserContext.Provider
			value={{
				userHandle,
				userData,
				isLoggedIn,
				error,
				login,
				onError,
			}}
		>
			<Router>
				<NavBar />
				<main>
					<Switch>
						<Route exact path="/">
							<UserDashboard />
						</Route>
						<Route path="/contests" exact>
							<ContestTable />
						</Route>
						<Route path="/questions" exact>
							<QuestionTable />
						</Route>
						<Route exact path="/contest/:contestId">
							<ContestInfo />
						</Route>
						<Route exact path="/auth">
							<main>Auth</main>
						</Route>
						<Redirect to="/" />
					</Switch>
				</main>
			</Router>
		</UserContext.Provider>
	);
};

export default App;
