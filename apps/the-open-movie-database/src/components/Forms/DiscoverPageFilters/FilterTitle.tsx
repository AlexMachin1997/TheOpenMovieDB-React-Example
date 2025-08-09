import { Icon, Tooltip } from '~/components/Core';

type FilterTitleProps = {
	title: string;
	tooltip: string;
};

const FilterTitle = ({ title, tooltip }: FilterTitleProps) => (
	<div className='mb-2 flex justify-between'>
		<span className='font-light'>{title}</span>

		<Tooltip tooltip={tooltip} placement='top' maxWidth={150} className='text-center'>
			<Icon className='fa-solid fa-circle-info' />
		</Tooltip>
	</div>
);

export default FilterTitle;
