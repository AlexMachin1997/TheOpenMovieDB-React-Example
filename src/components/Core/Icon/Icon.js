import styled from 'styled-components';

import generateColours from '../../../utils/theming/generateColours';

export const IconWrapper = styled.div`
	color: ${(props) => generateColours(props.theme, props.colour)};
	cursor: pointer;
`;
