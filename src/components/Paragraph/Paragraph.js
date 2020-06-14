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

export const StoryPreview = styled.div`
	background: #f0f2f5;
	padding: 1rem;
`;

export default Paragraph;
