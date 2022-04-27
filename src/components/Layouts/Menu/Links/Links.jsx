import * as React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const Links = ({
	links,
	onItemClick,
	wrapperTag: WrapperTag,
	listItemClassName,
	anchorClassName,
	...props
}) => (
	<WrapperTag className='mb-3 p-0' {...props}>
		{links.map((link, index) => {
			// If the link is internal use the react-router-dom Link component
			if (link.url.startsWith('/')) {
				return (
					<li key={index} className={listItemClassName}>
						<Link
							className={anchorClassName}
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
				<li key={index} className={listItemClassName}>
					<a
						className={anchorClassName}
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
	</WrapperTag>
);

Links.propTypes = {
	links: PropTypes.array,
	onItemClick: PropTypes.func,
	wrapperTag: PropTypes.string,
	listItemClassName: PropTypes.string,
	anchorClassName: PropTypes.string
};

Links.defaultProps = {
	links: [],
	onItemClick: null,
	wrapperTag: 'ul',
	listItemClassName: '',
	anchorClassName: 'font-light text-base text-white'
};

export default Links;
