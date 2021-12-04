import React, { useContext, useState } from "react";
import UserForm from "../Components/UserForm";
import UserQuestionTable from "../Components/UserQuestionTable";
import { Divider, Menu } from "semantic-ui-react";
import UserContestTable from "../Components/UserContestTable";
import { UserContext } from "../../Shared/Context/UserContext";
import ErrorModal from "../../Shared/UIElements/ErrorModal";

const UserDashboard = () => {
	const { isLoggedIn, error } = useContext(UserContext);
	const [activeItem, setActiveItem] = useState("questions");

	const itemClickHandler = (e, { name }) => {
		setActiveItem(name);
	};

	return (
		<React.Fragment>
			<div className="vertical-container">
				<UserForm />
				<main>
					<div className="full-width">
						<Divider hidden />

						<Menu pointing secondary>
							<Menu.Item
								name="contest"
								active={activeItem === "contest"}
								onClick={itemClickHandler}
							/>
							<Menu.Item
								name="questions"
								active={activeItem === "questions"}
								onClick={itemClickHandler}
							/>
						</Menu>
						{error ? <ErrorModal message={error} /> : null}
						{!error && isLoggedIn ? (
							activeItem === "contest" ? (
								<UserContestTable />
							) : (
								<UserQuestionTable />
							)
						) : null}
					</div>
				</main>
			</div>
		</React.Fragment>
	);
};
export default UserDashboard;
