import * as React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import Icon from '../../../Core/Icon';

const SearchBar = ({ display }) => {
	const containerClassName = className('fixed top-[68px] right-0 left-0', {
		visible: display === true,
		invisible: display === false
	});

	return (
		<div className={containerClassName}>
			<div className='flex items-center p-4 bg-white border border-solid border-slate-300'>
				<div className='mr-3 cursor-pointer'>
					<Icon icon='SearchCircle' size={30} colour='black' />
				</div>
				<input
					type='text'
					placeholder='Search for a movie, tv show, person...'
					style={{ width: '100%', border: 'none' }}
				/>
				<div className='cursor-pointer'>
					<Icon icon='Close' size={30} colour='black' />
				</div>
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
