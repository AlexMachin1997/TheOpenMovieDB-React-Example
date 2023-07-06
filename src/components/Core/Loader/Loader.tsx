import className from 'classnames';

type Props = {
	isFixed?: boolean;
};

const Loader = ({ isFixed = true }: Props) => (
	<div
		className={className('flex h-[500px] items-center justify-center bg-inherit', {
			'fixed bottom-0 left-0 right-0 top-0': isFixed
		})}
	>
		<div
			className={className('block h-32 w-32 animate-spin rounded-[50%] text-base', {
				'absolute left-[50%] top-[50%] ml-[-4rem] mt-[-4.05rem]': isFixed
			})}
			style={{
				border: '0.8em solid rgba(218, 219, 223, 1)',
				borderLeft: '0.8em solid rgba(58, 166, 165, 1)'
			}}
		/>
	</div>
);

export default Loader;
