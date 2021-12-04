import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/CustomButton.css";

const CustomButton = (props) => {
	// console.log(props.target,props.forPath);
	if (props.target !== "blank")
		return (
			<div
				className={`custom-button center-flex ${props.className !== null ? props.className : ""}`}
				style={props.style !== null ? props.style : {}}
			>
				<Link to={props.forPath}>{props.description}</Link>
			</div>
		);
	else {
		return (
			<div
				className={`custom-button center-flex ${props.className !== null ? props.className : ""}`}
				style={props.style !== null ? props.style : {}}
			>
				<a rel="noopener noreferrer" href={props.forPath} target="_blank">
					{props.description}
				</a>
			</div>
		);
	}
};
export default CustomButton;
