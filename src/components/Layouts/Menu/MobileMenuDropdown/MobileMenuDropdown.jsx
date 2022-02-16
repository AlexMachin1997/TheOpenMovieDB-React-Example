import * as React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const MobileMenuDropdown = ({ title, items, onItemClick }) => {
	const [isSectionActive, setIsSectionActive] = React.useState(false);

	return (
		<div
			className='my-4'
			onClick={() => {
				// Make the dropdown active
				setIsSectionActive((prevState) => !prevState);
			}}
			onKeyDown={(event) => {
				// If the user uses the enter key execute the callback
				if (event.key === 'Enter') {
					// Make the dropdown active
					setIsSectionActive((prevState) => !prevState);
				}
			}}
			tabIndex={0}
			role='button'
		>
			{title.length !== 0 && <h3 className='font-bold text-white text-base'>{title}</h3>}
			{isSectionActive === true && (
				<ul className='p-0 mb-3'>
					{items.map((link, index) => {
						const linkType = link?.type ?? 'external';

						// If the link is internal use the react-router-dom Link component
						if (linkType === 'internal') {
							return (
								<li key={index}>
									<Link
										className='font-light text-base text-white'
										to={link.url}
										onClick={(event) => {
											// If the user uses the enter key execute the callback
											if (onItemClick) {
												onItemClick(event);
											}
										}}
									>
										{link.menuTitle}
									</Link>
								</li>
							);
						}

						// If it's not internal it's external so see the standard anchor tag
						return (
							<li key={index}>
								<a
									className='font-light text-base text-white'
									href={link.url}
									onClick={(event) => {
										// If the user uses the enter key execute the callback
										if (onItemClick) {
											onItemClick(event);
										}
									}}
								>
									{link.menuTitle}
								</a>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

MobileMenuDropdown.propTypes = {
	title: PropTypes.string,
	items: PropTypes.array,
	onItemClick: PropTypes.func
};

MobileMenuDropdown.defaultProps = {
	title: '',
	items: [],
	onItemClick: null
};

export default MobileMenuDropdown;
