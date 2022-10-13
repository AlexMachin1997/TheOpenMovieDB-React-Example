import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DatePicker = ({ label, id, isRow, ...props }) => (
	<div
		className={classNames({
			'flex items-center': isRow === true
		})}
	>
		<label htmlFor={id} className='w-[100px] text-black'>
			{label}
		</label>
		<input
			id={id}
			type='date'
			className='block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-2 text-base font-light leading-[1.5] text-black transition-transform'
			{...props}
		/>
	</div>
);

DatePicker.propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	isRow: PropTypes.string
};

DatePicker.defaultProps = {
	isRow: false
};

export default DatePicker;
