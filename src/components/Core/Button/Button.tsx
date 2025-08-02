import * as React from 'react';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => (
	<button type='button' tabIndex={0} ref={ref} {...props}>
		{children}
	</button>
));

Button.displayName = 'Button';
export default Button;
