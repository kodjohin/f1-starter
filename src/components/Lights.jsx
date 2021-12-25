import { useState, useContext, useEffect } from "react";
import Light from "./components/Light";
import styled from "styled-components";

const StyledLights = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Lights = () => {
	const { lighting, offLights } = useContext(AppContext);

	const lightsData = [
		{ id: "light1", on: false },
		{ id: "light2", on: false },
		{ id: "light3", on: false },
		{ id: "light4", on: false },
		{ id: "light5", on: false },
	];
	const [lights, setLights] = useState(lightsData);
	const [currIndex, setCurrIndex] = useState(4);

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
						//** Off lights and Run the watch */
						setLights(lightsData);
						offLights()
					}, 2000);
			}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currIndex, lighting]);
	return (
		<StyledLights>
			{lights.map((light) => (
				<Light key={light.id} on={light.on} />
			))}
		</StyledLights>
	);
};

export default Lights;
