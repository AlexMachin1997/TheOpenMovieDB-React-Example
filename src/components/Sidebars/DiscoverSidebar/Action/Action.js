import styled from 'styled-components';

export const FilterActionButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid #e3e3e3;
	border-bottom: ${(props) => (props.isToggled === true ? 0 : '1px')} solid #e3e3e3;
	padding: 1rem;
	cursor: pointer;
	border-radius: ${(props) => (props.isToggled === true ? '0.5rem 0.5rem 0 0' : '0.5rem')};

	@media (max-width: 500px) {
		h3 {
			font-size: 1rem;
		}
	}
`;

export const FilterActionContainer = styled.div`
	padding: 1rem;
`;

export const FilterActionDropdown = styled.div`
	display: ${(props) => (props.isToggled ? 'flex' : 'none')};
	padding: 1rem;
	border: 1px solid #e3e3e3;
	border-radius: 0 0 0.5rem 0.5rem;
`;
