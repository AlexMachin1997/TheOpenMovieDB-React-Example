import * as React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import Button from '../Button/Button';

const Dropdown = ({
	title,
	children,
	buttonClass,
	dropdownClass,
	containerClass,
	onClick,
	alignment
}) => {
	// Stores the dropdown open state
	const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

	// Stores a reference to the dropdown container element, some how it is used to detect if the user has clicked outside the element......
	const dropdownRef = React.useRef(null);

	React.useEffect(() => {
		const handleClickOutside = (event) => {
			// Check if the user has clicked outside of the component (clicked another dropdown or just another page element)
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
		};

		const handleEscClick = (event) => {
			// When the user clicks the Escape (esc) key close the dropdown
			if (event.key === 'Escape') {
				setIsDropdownOpen(false);
			}
		};

		// When the user clicks the document (outside the component) use the  handleClickOutside
		document.addEventListener('click', handleClickOutside, true);

		// When the user keys up use the handleEscClick
		document.addEventListener('keyup', handleEscClick, true);

		return () => {
			// Remove the click event (Requires the same arguments as addEventListener)
			document.removeEventListener('click', handleClickOutside, true);

			// Remove the keyup event (Requires the same arguments as addEventListener)
			document.removeEventListener('keyup', handleEscClick, true);
		};
	}, []);

	return (
		<div className={className('relative inline-block', containerClass)} ref={dropdownRef}>
			<Button
				className={`inline-flex w-full justify-center ${buttonClass}`}
				aria-expanded='true'
				aria-haspopup='true'
				onClick={(event) => {
					// When the button is clicked invert the current value (true => false, false => true)
					setIsDropdownOpen((prevState) => !prevState);

					// If the user has provided a custom callback fire that event
					if (onClick) {
						onClick(event);
					}
				}}
			>
				{title}
			</Button>

			<ul
				className={className(`absolute w-[173px] origin-top-right`, dropdownClass, {
					hidden: isDropdownOpen === false,
					block: isDropdownOpen === true,
					'left-0': alignment === 'left',
					'right-0': alignment === 'right'
				})}
				role='menu'
				aria-orientation='vertical'
				aria-labelledby='dropdown'
				tabIndex='-1'
			>
				{children}
			</ul>
		</div>
	);
};

Dropdown.propTypes = {
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	children: PropTypes.node.isRequired,
	buttonClass: PropTypes.string,
	dropdownClass: PropTypes.string,
	containerClass: PropTypes.string,
	onClick: PropTypes.func,
	alignment: PropTypes.string
};

Dropdown.defaultProps = {
	title: 'Default title',
	buttonClass: '',
	dropdownClass: '',
	containerClass: '',
	onClick: null,
	alignment: 'left'
};

export default Dropdown;
