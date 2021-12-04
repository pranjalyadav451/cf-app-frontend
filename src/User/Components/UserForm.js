import React, { useContext, useState } from "react";
import { Form, Input } from "semantic-ui-react";
import axios from "axios";

import processUserData from "../../Shared/util/processUserData";
import { UserContext } from "../../Shared/Context/UserContext";

const UserForm = () => {
	const user = useContext(UserContext);

	const [userHandle, setUserHandle] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		await axios({
			baseURL: process.env.REACT_APP_BACKEND_URL,
			url: "/codeforces/user",
			params: {
				handle: userHandle,
			},
		})
			.then((res) => {
				setIsLoading(false);
				user.onError(null);
				user.login(userHandle, processUserData(res.data.userStatus));
			})
			.catch((err) => {
				setIsLoading(false);
				user.onError(err.message);
			});
	};

	const userHandleChangeHandler = (event) => {
		setUserHandle(event.target.value);
	};

	return (
		<Form onSubmit={onSubmitHandler}>
			<Form.Field>
				<Input
					label="Codeforces Handle"
					placeholder="Enter Username"
					size="large"
					className="add-border"
					loading={isLoading}
					value={userHandle}
					onChange={userHandleChangeHandler}
				/>
			</Form.Field>
		</Form>
	);
};

export default UserForm;
