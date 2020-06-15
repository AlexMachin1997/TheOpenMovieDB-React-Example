import styled from 'styled-components';

const Paragraph = styled.p`
	font-family: ${(props) => props.theme.font};
	font-weight: ${(props) => props.fontWeight};
	line-height: ${(props) => props.lineHeight};
	font-size: ${(props) => props.fontSize};
	margin: 0;
	padding: 0;
	color: ${(props) => (props.textColour === '' ? props.theme.textColour : props.textColour)};
`;

export default Paragraph;
