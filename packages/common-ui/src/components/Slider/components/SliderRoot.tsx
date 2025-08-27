import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '~/utils/className';

type SliderRootProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
	className?: string;
};

export const SliderRoot = ({ className, ...props }: SliderRootProps) => (
	<SliderPrimitive.Root
		data-slot='slider-root'
		className={cn('relative flex items-center w-full h-5', className)}
		{...props}
	/>
);
SliderRoot.displayName = 'SliderRoot';
