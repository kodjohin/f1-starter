
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	text-align: center;
`;
const Button = styled.button`
	border: 1px solid #ccc;
	background-color: #fff;
	font-size: 2em;
	padding: 15;
	margin: 5;
	width: 200;
`;
const Output = styled.output`
	font-size: 5em;
	display: block;
`;

const initialState = { lapse: 0, running: false };

const StopWatch = () => {
	const [state, setState] = useState(initialState);

	useEffect(() => {
		if (state.running) {
			let start;
			const step = (timestamp) => {
				if (!start) start = timestamp;
				const progress = parseInt(timestamp - start, 10);
				setState((s) => {
					if (!s.running) {
						return s;
					}

					return { ...s, lapse: progress };
				});
				requestAnimationFrame(step);
			};
			const rafId = requestAnimationFrame(step);
			return () => cancelAnimationFrame(rafId);
		}
	}, [state.running]);

	const handleRunClick = () => setState((s) => ({ ...s, running: !s.running }));
	const handleClearClick = () => {
		setState(initialState);
	};

	return (
		<Wrapper>
			<Output>{state.lapse}ms</Output>
			<Button onClick={handleRunClick}>
				{state.running ? "Stop" : "Start"}
			</Button>
			<Button onClick={handleClearClick}>Clear</Button>
		</Wrapper>
	);
};

export default StopWatch;