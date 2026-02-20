import { cn } from '@repo/tailwind-config';
import type { ISkeleton } from '~/components/Skeleton/Skeleton.types';

const Skeleton = ({ className, ...props }: ISkeleton) => {
	return (
		<div
			data-slot='skeleton'
			className={cn('bg-accent animate-pulse rounded-md', className)}
			{...props}
		/>
	);
};

export { Skeleton };
