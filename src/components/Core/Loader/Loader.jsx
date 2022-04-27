import * as React from 'react';
import PropTypes from 'prop-types';

import className from 'classnames';

const Loader = ({ isFixed }) => (
	<div
		className={className('flex h-[500px] items-center justify-center bg-inherit', {
			fixed: isFixed,
			'top-0': isFixed,
			'right-0': isFixed,
			'bottom-0': isFixed,
			'left-0': isFixed
		})}
	>
		<div
			className={className('block h-32 w-32 animate-spin rounded-[50%] text-base', {
				'left-[50%]': isFixed,
				'ml-[-4rem]': isFixed,
				absolute: isFixed,
				'top-[50%]': isFixed,
				'mt-[-4.05rem]': isFixed
			})}
			style={{
				border: '0.8em solid rgba(218, 219, 223, 1)',
				borderLeft: '0.8em solid rgba(58, 166, 165, 1)'
			}}
		/>
	</div>
);

Loader.defaultProps = {
	isFixed: true
};

Loader.propTypes = {
	isFixed: PropTypes.bool
};

export default Loader;
