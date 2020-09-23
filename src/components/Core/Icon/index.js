import React from 'react';
import PropTypes from 'prop-types';

import { Close } from 'styled-icons/ionicons-solid';
import { Menu } from 'styled-icons/boxicons-regular';
import { SearchCircle } from 'styled-icons/heroicons-outline';
import * as IconReference from './iconReferences';

import { IconWrapper } from './Icon';

const Icon = ({ icon, colour, onClick, size }) => {
	switch (icon) {
		case IconReference.MenuRef: {
			return (
				<IconWrapper colour={colour} onClick={onClick}>
					<Menu size={size} />
				</IconWrapper>
			);
		}

		case IconReference.SearchCircleRef: {
			return (
				<IconWrapper colour={colour} onClick={onClick}>
					<SearchCircle size={size} />
				</IconWrapper>
			);
		}

		case IconReference.CloseIconRef: {
			return (
				<IconWrapper colour={colour} onClick={onClick}>
					<Close size={size} />
				</IconWrapper>
			);
		}

		default: {
			return null;
		}
	}
};

Icon.defaultProps = {
	size: 30,
	icon: IconReference.SearchCircleRef,
	onClick: () => false,
	colour: 'black'
};

Icon.propTypes = {
	size: PropTypes.number,
	icon: PropTypes.string,
	onClick: PropTypes.func,
	colour: PropTypes.string
};

export default Icon;
