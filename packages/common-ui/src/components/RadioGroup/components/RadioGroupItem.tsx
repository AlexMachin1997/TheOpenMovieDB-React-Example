import { cn } from '~/utils/className';
import { Radio } from '~/components/Radio/Radio';
import { RadioLabel } from '~/components/Radio/Radio';

interface IRadioGroupItem extends React.ComponentProps<typeof Radio> {
	label: string;
}

export const RadioGroupItem = ({
	className,
	label,
	disabled = false,
	iconClassName,
	...props
}: IRadioGroupItem) => {
	return (
		<div
			className={cn('flex items-center space-x-2', {
				'cursor-not-allowed': disabled,
				'cursor-pointer': !disabled
			})}
		>
			<RadioLabel htmlFor={props.id} disabled={disabled}>
				{label}
			</RadioLabel>

			<Radio className={className} disabled={disabled} iconClassName={iconClassName} {...props} />
		</div>
	);
};
