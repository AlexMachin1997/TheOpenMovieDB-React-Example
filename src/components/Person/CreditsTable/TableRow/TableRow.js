import styled from 'styled-components';

export const Container = styled.tr`
	display: flex;
	align-items: center;
`;

export const Year = styled.td`
	font-weight: 400;
	vertical-align: top;
	text-align: left;

	@media (min-width: 600px) {
		width: 64px;
		text-align: center;
	}
`;

export const Separator = styled.td`
	padding: 0;
	color: #ccc;
	vertical-align: top;
	display: none;

	@media (min-width: 600px) {
		width: 24px;
		display: block;
	}
`;

export const Role = styled.td`
	padding: 0.5rem 1rem;
`;
