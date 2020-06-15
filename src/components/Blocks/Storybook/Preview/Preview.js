import styled from 'styled-components';

import generateColours from '../../../../utils/theming/generateColours';

export const Container = styled.div`
	background-color: ${(props) => generateColours(props.theme, props.background, props.background)};
	padding: 1rem;
`;
