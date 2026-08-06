import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@repo/tailwind-config';
import { Icon } from '~/components/Icon/Icon';
import type { IRadio } from '~/components/Radio/Radio.types';

export const Radio = ({ className, disabled = false, iconClassName, ...props }: IRadio) => {
	return (
		<RadioGroupPrimitive.Item
			data-slot='radio'
			className={cn(
				// `peer` is load-bearing, not decoration: RadioLabel carries
				// `peer-disabled:cursor-not-allowed peer-disabled:opacity-70`, and Tailwind's `peer-*`
				// only matches a `.peer` that precedes it as a sibling. Without this class those
				// rules silently matched nothing — flagged in 04, fixed here. `Checkbox` has always
				// had it, which is why only Radio's disabled label treatment was wrong.
				'peer border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			disabled={disabled}
			{...props}
		>
			<RadioGroupPrimitive.Indicator
				data-slot='radio-indicator'
				className='relative flex items-center justify-center'
			>
				{/*
				 * `**:fill-primary` targets the circle shape itself. The icon data sets
				 * `fill="none"` on that shape, which beats a `fill` inherited from the svg — a
				 * plain `fill-primary` here would leave the selected dot hollow.
				 */}
				<Icon
					name='circle'
					className={cn(
						'**:fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2',
						iconClassName
					)}
				/>
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
};

Radio.displayName = 'Radio';
