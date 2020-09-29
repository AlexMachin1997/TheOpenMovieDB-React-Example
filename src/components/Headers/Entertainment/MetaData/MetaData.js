import styled from 'styled-components';

export const Facts = styled.div`
	color: white;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	padding: 1rem 1rem 1rem 1rem;

	background-color: rgba(0, 0, 0, 0.1);
	border-top: 1px solid rgba(0, 0, 0, 0.2);
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);

	@media (min-width: 900px) {
		padding: 0;
		background-color: transparent;
		border-top: none;
		border-bottom: none;
		justify-content: flex-start;
	}
`;

export const Certification = styled.span`
	color: rgba(100%, 100%, 100%, 0.6);
	border: 1px solid rgba(100%, 100%, 100%, 0.6);
	display: inline-flex;
	white-space: nowrap;
	align-items: center;
	align-content: center;
	padding: 0.06em 4px 0.15em 4px;
	line-height: 1;
	border-radius: 2px;
	margin-right: 7px;
`;

export const ReleaseDate = styled.span``;

export const Genres = styled.span`
	padding-left: 1rem;
`;

export const Runtime = styled.span`
	padding-left: 1rem;
	display: inline-flex;
	align-items: center;
`;
