import classnames from 'classnames';

// Tippy dependencies.
import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface Props extends TippyProps {
	tooltip: React.ReactNode;
}

const Tooltip = ({ children, tooltip, placement = 'auto', className, ...props }: Props) => (
	<Tippy
		content={tooltip}
		placement={placement}
		className={classnames('inline-block', className)}
		{...props}
	>
		<div className='inline-flex'>{children}</div>
	</Tippy>
);

export default Tooltip;
