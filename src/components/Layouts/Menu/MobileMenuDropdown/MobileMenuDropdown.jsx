import * as React from 'react';
import PropTypes from 'prop-types';

import Links from '../Links/Links';

const MobileMenuDropdown = ({ title, links, onItemClick, ...props }) => {
	const [isSectionActive, setIsSectionActive] = React.useState(false);

	return (
		<div
			className='my-4'
			onClick={() => setIsSectionActive((prevState) => !prevState)}
			onKeyDown={(event) => {
				// If the user uses the enter key execute the callback
				if (event.key === 'Enter') {
					// Make the dropdown active
					setIsSectionActive((prevState) => !prevState);
				}
			}}
			tabIndex={0}
			role='button'
			{...props}
		>
			{title.length !== 0 && <h3 className='font-bold text-white text-base'>{title}</h3>}
			{isSectionActive === true && (links?.length ?? 0) > 0 && (
				<Links links={links} onItemClick={onItemClick} />
			)}
		</div>
	);
};

MobileMenuDropdown.propTypes = {
	title: PropTypes.string,
	links: PropTypes.array,
	onItemClick: PropTypes.func
};

MobileMenuDropdown.defaultProps = {
	title: '',
	links: [],
	onItemClick: null
};

export default MobileMenuDropdown;
