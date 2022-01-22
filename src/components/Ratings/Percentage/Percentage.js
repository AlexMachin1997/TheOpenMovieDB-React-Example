import styled from 'styled-components';

const generateRatingStrokeColour = (rating) => {
	// Red (Less than 40)
	if (rating <= 40) {
		return '#FF0000';
	}

	// Yellow (Less than or equal to 50)
	if (rating <= 50 || rating < 70) {
		return '#ffea00';
	}

	// Green (Greater than or equal to 70)
	if (rating >= 70) {
		return '#00CD66';
	}
};

export const Circle = styled.svg`
	background: #3d3d3d;
	border-radius: 100%;
	color: white;
	padding: 0.2rem;
`;

export const CircleBackground = styled.circle`
	stroke: #767656;
	fill: none;
`;

export const CircleProgress = styled.circle`
	stroke: ${(props) => generateRatingStrokeColour(props.rating)};
	stroke-linecap: round;
	stroke-linejoin: round;
	fill: none;
`;

export const CircleText = styled.text`
	font-size: ${(props) => props.textSize};
	font-weight: 900;
	fill: white;
`;
