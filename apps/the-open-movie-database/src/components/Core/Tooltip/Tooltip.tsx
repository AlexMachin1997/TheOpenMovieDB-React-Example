import classnames from 'classnames';

// Tippy dependencies.
import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface TooltipProps extends TippyProps {
	tooltip: React.ReactNode;
}

const Tooltip = ({ children, tooltip, placement = 'auto', className, ...props }: TooltipProps) => (
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
