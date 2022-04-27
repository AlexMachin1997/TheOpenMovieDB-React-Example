import * as React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import { Icon } from '../../../Core';

const SearchBar = ({ display }) => {
	const containerClassName = className('fixed top-[57px] right-0 left-0', {
		visible: display === true,
		invisible: display === false
	});

	return (
		<div className={containerClassName}>
			<div className='flex items-center border border-solid border-slate-300 bg-white p-4'>
				<Icon className='fa-solid fa-magnifying-glass mr-3 cursor-pointer text-black' />
				<input
					type='text'
					placeholder='Search for a movie, tv show, person...'
					className='w-full border-none pr-3'
				/>
				<Icon className='fa-solid fa-xmark cursor-pointer text-base text-black' />
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
