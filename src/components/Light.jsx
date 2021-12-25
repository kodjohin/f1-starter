import React from "react";
import styled from "styled-components";

const StyledLight = styled.div`
	box-shadow: 0 5px 2px 0 #1565c0;
	transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1);
	height: 18vmin;
	width: 18vmin;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
    background-color: #858282;
		
	.inner {
		height: 17vmin;
		width: 17vmin;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
        background-color: #1a1818;
        
	}
	
	&.on {
		background-color: #f44336;
        .inner {
			background-color: #b71c1c;
            transition: background-color .3s ease;
		}
	}
`;

const Light = ({on}) => {
    
	return (
		<StyledLight className={`light ${on && "on"}`}>
			<div className="inner"></div>
		</StyledLight>
	);
};

export default Light;
