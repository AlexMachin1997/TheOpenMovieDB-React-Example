import { Slot } from '@radix-ui/react-slot';
import { cn } from '@repo/tailwind-config';
import { buttonVariants } from '~/components/Button/variants';
import type { IButton } from '~/components/Button/Button.types';

const Button = ({ className, variant, size, asChild = false, ...props }: IButton) => {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
};

Button.displayName = 'Button';

export { Button };
