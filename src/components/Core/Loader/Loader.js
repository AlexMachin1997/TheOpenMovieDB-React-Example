import styled, { keyframes } from 'styled-components';

const Spin = keyframes`
0% {
  transform: rotate(360deg);
}
100% {
  transform: rotate(0deg);
}
`;

export const LoaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: ${(props) => props.height};
	background: inherit;
`;

export const FixedLoaderWrapper = styled(LoaderWrapper)`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

export const Loader = styled.div`
	font-size: 10px;
	border: 0.8em solid rgba(218, 219, 223, 1);
	border-left: 0.8em solid rgba(58, 166, 165, 1);
	animation: ${Spin} 0.7s infinite reverse;
	border-radius: 50%;
	width: 8em;
	height: 8em;
	display: block;
`;

export const FixedLoader = styled(Loader)`
	left: 50%;
	margin-left: -4em;
	position: absolute;
	top: 50%;
	margin-top: -4.05em;
`;
