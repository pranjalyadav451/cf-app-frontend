import React, { useEffect, useState } from "react";
import { Modal, Button } from "semantic-ui-react";

const ErrorModal = (props) => {
	const [openModal, setOpenModal] = useState(true);
	const { message } = props;
	useEffect(() => {
		if (message.length > 0) setOpenModal(true);
		else setOpenModal(false);
	}, [message]);

	return (
		<Modal dimmer="blurring" open={openModal}>
			<Modal.Header>ERROR OCCURRED!!!</Modal.Header>
			<Modal.Content>{props.message}</Modal.Content>
			<Modal.Actions>
				<Button
					negative
					onClick={() => {
						setOpenModal(false);
					}}
				>
					Close
				</Button>
			</Modal.Actions>
		</Modal>
	);
};
export default ErrorModal;
