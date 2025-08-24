import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '~/utils/className';
import { buttonVariants } from '~/components/button/variants';

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps extends React.ComponentProps<'button'> {
	variant?: ButtonVariants['variant'];
	size?: ButtonVariants['size'];
	asChild?: boolean;
}

const Button = ({ className, variant, size, asChild = false, ...props }: ButtonProps) => {
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
