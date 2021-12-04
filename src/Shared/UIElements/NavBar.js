import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<div className="ui pointing menu">
			<NavLink to="/" exact className="item">
				Home
			</NavLink>
			<NavLink to="/contests" exact className="item">
				Contests
			</NavLink>

			<NavLink to="/questions" exact className="item">
				Questions
			</NavLink>
		</div>
	);
};
export default NavBar;
