import styled from 'styled-components';

import { Star } from 'styled-icons/boxicons-solid';

export const StyledStar = styled(Star)`
	color: ${(props) => props.colour};
`;
