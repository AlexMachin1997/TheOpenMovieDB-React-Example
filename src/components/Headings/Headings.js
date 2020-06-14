import styled from 'styled-components';

export const Heading1 = styled.h1`
	font-family: ${(props) => props.theme.font};
	font-weight: ${(props) => props.fontWeight};
	line-height: ${(props) => props.lineHeight};
	font-size: ${(props) => props.fontSize};
	margin: 0;
	padding: 0;
	color: ${(props) => props.theme.textColour};

	&:focus {
		outline: 0;
	}
`;

export const Heading2 = styled.h2`
	font-family: ${(props) => props.theme.font};
	font-weight: ${(props) => props.fontWeight};
	line-height: ${(props) => props.lineHeight};
	font-size: ${(props) => props.fontSize};
	margin: 0;
	padding: 0;
	color: ${(props) => props.theme.textColour};

	&:focus {
		outline: 0;
	}
`;

export const Heading3 = styled.h3`
	font-family: ${(props) => props.theme.font};
	font-weight: ${(props) => props.fontWeight};
	line-height: ${(props) => props.lineHeight};
	font-size: ${(props) => props.fontSize};
	margin: 0;
	padding: 0;
	color: ${(props) => props.theme.textColour};

	&:focus {
		outline: 0;
	}
`;

export const Heading4 = styled.h4`
	font-family: ${(props) => props.theme.font};
	font-weight: ${(props) => props.fontWeight};
	line-height: ${(props) => props.lineHeight};
	font-size: ${(props) => props.fontSize};
	margin: 0;
	padding: 0;
	color: ${(props) => props.theme.textColour};

	&:focus {
		outline: 0;
	}
`;

export const Heading5 = styled.h5`
	font-family: ${(props) => props.theme.font};
	font-weight: ${(props) => props.fontWeight};
	line-height: ${(props) => props.lineHeight};
	font-size: ${(props) => props.fontSize};
	margin: 0;
	padding: 0;
	color: ${(props) => props.theme.textColour};

	&:focus {
		outline: 0;
	}
`;

export const Heading6 = styled.h6`
	font-family: ${(props) => props.theme.font};
	font-weight: ${(props) => props.fontWeight};
	line-height: ${(props) => props.lineHeight};
	font-size: ${(props) => props.fontSize};
	margin: 0;
	padding: 0;
	color: ${(props) => props.theme.textColour};

	&:focus {
		outline: 0;
	}
`;
