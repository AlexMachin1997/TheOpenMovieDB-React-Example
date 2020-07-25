import styled from 'styled-components';

const Column = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 100%;
	flex: ${(props) => (props.autoWidth ? '0 0 auto' : '1')};
	flex-wrap: wrap;
`;

export default Column;
