import styled from 'styled-components';

export const Container = styled.div`
	background: ${(props) => props.theme.primary};
`;

export const Footer = styled.footer`
	display: grid;
	grid-template-columns: 1fr;
	margin: 0 auto;
	max-width: 1300px;
	background: ${(props) => props.theme.primary};
	padding: 2rem;
	align-items: flex-start;
	row-gap: 30px;

	button {
		padding: 1.3rem 2rem;
	}

	/* Desktop Styling */
	@media (min-width: 1000px) {
		grid-template-columns: repeat(5, 1fr);
		column-gap: 50px;

		button {
			padding: 1rem 1rem;
		}
	}
`;

export const FooterContent = styled.div`
	img {
		display: none;
	}

	@media (min-width: 1000px) {
		img {
			display: block;
			position: relative;
			top: 10px;
		}

		p {
			font-size: 1rem;
		}
	}
`;

export const JoinNowColumn = styled.div`
	@media (min-width: 1000px) {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		position: relative;
		top: -20px;
	}
`;
