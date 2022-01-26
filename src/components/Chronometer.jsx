import styled from "styled-components";
import { useContext, useEffect } from "react";
import { AppContext } from "../AppState";

const Output = styled.output`
	font-size: 5em;
	display: block;
	color: #fff;
`;
const Chronometer = () => {
	const { running, lapse} = useContext(AppContext);
	useEffect(() => {
		if (running) {
			console.log("Timer is running");
			let start;
			const step = (timestamp) => {
				if (!start) start = timestamp;
				const progress = parseInt(timestamp - start, 10);
				if(!running) return lapse
				return progress;
				requestAnimationFrame(step);
			};
			const rafId = requestAnimationFrame(step);
			return () => cancelAnimationFrame(rafId);
		}
	}, [running]);

	return <Output>{lapse}ms</Output>;
};

export default Chronometer;
