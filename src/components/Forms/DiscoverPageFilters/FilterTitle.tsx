import { Icon, Tooltip } from '../../Core';

type FilterTitleProps = {
	title: string;
	tooltip: string;
};

const FilterTitle = ({ title, tooltip }: FilterTitleProps) => (
	<div className='mb-2 flex justify-between'>
		<span className='font-light'>{title}</span>

		<Tooltip tooltip={tooltip} placement='top'>
			<Icon className='fa-solid fa-circle-info' />
		</Tooltip>
	</div>
);

export default FilterTitle;
