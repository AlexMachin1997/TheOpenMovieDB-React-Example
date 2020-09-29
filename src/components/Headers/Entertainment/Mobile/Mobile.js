import styled from 'styled-components';

export const Container = styled.div`
	display: block;
	position: relative;
	top: 0;
	left: 0;
	padding: 1rem;
`;

export const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem 1.1rem 0;
	flex-wrap: wrap;
	background: rgba(11.76%, 15.29%, 17.25%, 0.96);
`;

/*

Actions styling

*/

export const Actions = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	background: rgba(11.76%, 15.29%, 17.25%, 0.96);
	padding: 1rem;
`;

export const Pipe = styled.div`
	width: 1px;
	height: 24px;
	display: inline-block;
	border-left: 1px solid rgba(255, 255, 255, 0.3);
`;

export const RatingContainer = styled.div`
	display: flex;
	align-items: center;
	color: white;
`;

export const RatingText = styled.div`
	margin-left: 0.2rem;
	font-weight: 700;
`;

export const PlayTrailer = styled.li`
	display: flex;
	align-items: center;
`;
