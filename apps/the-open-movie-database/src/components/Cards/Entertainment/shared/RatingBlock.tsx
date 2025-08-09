import { Icon } from '~/components/Core';

type RatingBlockProps = {
	rating?: number | null;
};

const RatingBlock = ({ rating = null }: RatingBlockProps) =>
	rating !== null ? (
		<span className='inline-flex items-center rounded-full bg-black p-[0.4rem]'>
			<Icon className='fa-solid fa-solid fa-star text-white' />
			<p className='px-2 text-xs font-bold text-white'>{rating}</p>
		</span>
	) : (
		<span className='inline-flex items-center bg-black p-1 text-xs text-white'>Not rated</span>
	);

export default RatingBlock;
