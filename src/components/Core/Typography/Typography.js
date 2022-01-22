import styled from 'styled-components';

import generateColours from '../../../utils/theming/generateColours';

/*

Styled-Components Notes:

Extend usage:

The below code example allows a base style to be set, then the styling can be extended to other components.

styled(base).attrs({
	as: ''
})``


NOTE: The base component doesn't need to be the same type, the .attrs({as: [Insert type e.g. h1]}) to allow the omponent to be rendered correctly

*/

const base = styled.span`
	font-weight: ${(props) => props.fontWeight};
	line-height: ${(props) => props.lineHeight};
	font-size: ${(props) => props.fontSize};
	margin: 0;
	padding: 0;
	color: ${(props) =>
		props.colour === '' ? props.theme.textColour : generateColours(props.theme, props.colour)};
	text-decoration: ${(props) => (props.underline === true ? 'underline' : 'none')};
	text-transform: ${(props) => props.transform};
	font-style: ${(props) => props.fontStyle};
`;

export const Heading1 = styled(base).attrs({
	as: 'h1'
})``;

export const Heading2 = styled(base).attrs({
	as: 'h2'
})``;

export const Heading3 = styled(base).attrs({
	as: 'h3'
})``;

export const Heading4 = styled(base).attrs({
	as: 'h4'
})``;

export const Heading5 = styled(base).attrs({
	as: 'h5'
})``;

export const Heading6 = styled(base).attrs({
	as: 'h5'
})``;

export const Link = styled(base).attrs({
	as: 'a'
})``;

export const Label = styled(base).attrs({
	as: 'label'
})``;

export const Paragraph = styled(base).attrs({
	as: 'p'
})``;

export const ListItem = styled(base).attrs({
	as: 'li'
})``;
