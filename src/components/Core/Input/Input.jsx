import * as React from 'react';
import PropTypes from 'prop-types';

const Input = ({ label, id, placeholder, labelClassName, containerClassName, ...props }) => (
	<div className={containerClassName}>
		<label htmlFor={id} className={labelClassName}>
			{label}
		</label>
		<input
			type='text'
			id={id}
			className='block w-full appearance-none rounded-lg border-2 border-solid border-gray-300 bg-white bg-clip-padding p-2 text-base font-light leading-[1.5] text-black outline-none transition-transform focus:border-secondary'
			placeholder={placeholder}
			{...props}
		/>
	</div>
);

Input.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]).isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	labelClassName: PropTypes.string,
	containerClassName: PropTypes.string
};

Input.defaultProps = {
	placeholder: '',
	labelClassName: '',
	containerClassName: ''
};

export default Input;
