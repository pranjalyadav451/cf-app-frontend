import React from "react";
import CustomButton from "../../Shared/UIElements/CustomButton";

const STYLE_FIX_TO_CENTER_BUTTONS = {
	width: "100%",
};

const Contest = (props) => {
	const { isUserContest, contestLink } = props;
	return (
		<tr className={props.className}>
			<td>{props.title}</td>
			{isUserContest ? "" : <td className="center aligned">{props.numberOfQues}</td>}

			<td className="center aligned">
				<CustomButton
					style={STYLE_FIX_TO_CENTER_BUTTONS}
					class="ui green"
					description="Solve"
					target={isUserContest ? "blank" : ""}
					forPath={isUserContest ? contestLink : `/contest/${props.contestId}`}
				/>
			</td>
		</tr>
	);
};
export default Contest;
