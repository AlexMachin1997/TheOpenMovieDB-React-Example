import * as React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import Icon from '../../../Core/Icon/Icon';

const SearchBar = ({ display }) => {
	const containerClassName = className('fixed top-[57px] right-0 left-0', {
		visible: display === true,
		invisible: display === false
	});

	return (
		<div className={containerClassName}>
			<div className='flex items-center p-4 bg-white border border-solid border-slate-300'>
				<Icon className='fa-solid fa-magnifying-glass text-black mr-3 cursor-pointer' />
				<input
					type='text'
					placeholder='Search for a movie, tv show, person...'
					className='pr-3 w-full border-none'
				/>
				<Icon className='fa-solid fa-xmark text-black text-base cursor-pointer' />
			</div>
		</div>
	);
};

SearchBar.defaultProps = {
	display: false
};

SearchBar.propTypes = {
	display: PropTypes.bool
};

export default SearchBar;
