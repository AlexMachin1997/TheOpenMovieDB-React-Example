import * as React from 'react';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

const Button = ({ children, ...props }: ButtonProps) => (
	<button type='button' tabIndex={0} {...props}>
		{children}
	</button>
);

Button.displayName = 'Button';
export default Button;
