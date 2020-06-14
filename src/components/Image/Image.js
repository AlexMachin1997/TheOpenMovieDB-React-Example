import styled from 'styled-components';

const Image = styled.img`
	width: ${(props) => props.imageWidth};
	height: ${(props) => props.imageHeight};
	border-radius: ${(props) => props.borderRadius};
	border: ${(props) => props.border};

	&:hover {
		cursor: pointer;
		outline: 0;
	}
`;

export default Image;
