import { useState, useEffect } from "react";
import "./App.css";
import Light from "./components/Light";
import styled from "styled-components";

const StyledApp = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	gap: 100px;
	

	#container {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button {
		padding: 1em 3em;
		border-radius: 0.3em;
		cursor: pointer;
		font-size: 2rem;
		font-weight: 500;
		color: #f44336;

		:hover {
			background-color: #ffffffa6;
			transition: background-color 0.3s ease;
		}
	}
`;

const Output = styled.output`
	font-size: 5em;
	display: block;
	color: #fff;
`;

const initialState = { lapse: 0, running: false };

const App = () => {
	const lightsData = [
		{ id: "light1", on: false },
		{ id: "light2", on: false },
		{ id: "light3", on: false },
		{ id: "light4", on: false },
		{ id: "light5", on: false },
	];
	const [state, setState] = useState(initialState);
	const [lights, setLights] = useState(lightsData);
	const [currIndex, setCurrIndex] = useState(4);
	const [started, setStarted] = useState(false);

	useEffect(() => {
		if (!started) return;
		//** Light from right to left */
		currIndex >= 0 &&
			setTimeout(() => {
				const currentLight = lights.find(
					(light) => light.id === lights[currIndex].id
				);
				currentLight.on = true;
				setLights((lights) => lights);
				setCurrIndex(currIndex - 1);
				// console.log(lights);

				if (currIndex === 0)
					setTimeout(() => {
						setLights(lightsData);
						//** Run the watch */
						setState((s) => ({ ...s, running: true }));
						setStarted(false);
					}, 2000);
			}, 1000);
			// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currIndex, started]);

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

	const handleClick = () => {
		if (started || state.running) return;
		setStarted(true);
		setCurrIndex(4);
		//** Reset the watch */
		setState(initialState);
	};

	return (
		<StyledApp onClick={() => setState((s) => ({ ...s, running: false }))}>
			<div id="container">
				{lights.map((light) => (
					<Light key={light.id} on={light.on} />
				))}
			</div>
			<button onClick={handleClick}>START</button>
			<Output>{state.lapse}ms</Output>
		</StyledApp>
	);
};

export default App;
