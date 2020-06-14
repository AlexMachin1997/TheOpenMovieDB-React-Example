import styled from 'styled-components';

const Link = styled.a`
	text-decoration: none;
	color: ${(props) => (props.textColour === '' ? props.theme.textColour : props.textColour)};
`;

export const StoryPreview = styled.div`
	background: #f0f2f5;
	padding: 1rem;
`;

export default Link;
