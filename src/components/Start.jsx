import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../AppState";

const StyledStart = styled.button`
	padding: 2em 4em;
	border-radius: 0.3em;
	cursor: pointer;
	font-size: 2.5rem;
	font-weight: 500;
	color: #f44336;

	:hover {
		background-color: #ffffffa6;
		transition: background-color 0.3s ease;
	}
`;
const Start = () => {
	const { lighting, running, start } = useContext(AppContext);

	const handleClick = () => {
		if (lighting || running) return;
		start();
	};

	return (
		<StyledStart onClick={handleClick}>
			{running ? "STOP" : "START"}
		</StyledStart>
	);
};

export default Start;
