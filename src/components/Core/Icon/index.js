import * as React from 'react';
import PropTypes from 'prop-types';

import { Close } from 'styled-icons/ionicons-solid';
import { Menu, TimeFive } from 'styled-icons/boxicons-regular';
import { SearchCircle } from 'styled-icons/heroicons-outline';
import { HeartFill, BookmarkFill, StarFill, PlayFill, CardChecklist } from 'styled-icons/bootstrap';
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

		case IconReference.HeartFilledRef: {
			return (
				<IconWrapper colour={colour} onClick={onClick}>
					<HeartFill size={size} />
				</IconWrapper>
			);
		}

		case IconReference.BookmarkFill: {
			return (
				<IconWrapper colour={colour} onClick={onClick}>
					<BookmarkFill size={size} />
				</IconWrapper>
			);
		}

		case IconReference.ListTask: {
			return (
				<IconWrapper colour={colour} onClick={onClick}>
					<CardChecklist size={size} />
				</IconWrapper>
			);
		}

		case IconReference.StarFill: {
			return (
				<IconWrapper colour={colour} onClick={onClick}>
					<StarFill size={size} />
				</IconWrapper>
			);
		}

		case IconReference.PlayFill: {
			return (
				<IconWrapper colour={colour} onClick={onClick}>
					<PlayFill size={size} />
				</IconWrapper>
			);
		}

		case IconReference.Time: {
			return (
				<IconWrapper colour={colour} onClick={onClick}>
					<TimeFive size={size} />
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
