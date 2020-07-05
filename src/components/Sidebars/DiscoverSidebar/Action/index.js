import React from 'react';
import PropTypes from 'prop-types';

import { KeyboardArrowRight, KeyboardArrowDown } from 'styled-icons/material-rounded';

import { FilterActionContainer, FilterActionButton, FilterActionDropdown } from './Action';
import Heading from '../../../Heading';
import replaceSpacesWith from '../../../../utils/formatters/replaceSpacesWith';

const FilterAction = ({ title, onClick, content, isToggled }) => (
	<FilterActionContainer id={replaceSpacesWith(title, '-')}>
		<FilterActionButton isToggled={isToggled} onClick={onClick}>
			<Heading type='h3' weight='bold' height={1} size='1.5rem' text={title} />
			{isToggled === true ? <KeyboardArrowDown size='18' /> : <KeyboardArrowRight size='18' />}
		</FilterActionButton>
		<FilterActionDropdown
			isToggled={isToggled}
			aria-expanded={isToggled === true ? 'true' : 'false'}
		>
			<div>{content}</div>
		</FilterActionDropdown>
	</FilterActionContainer>
);

FilterAction.defaultProps = {
	title: 'title',
	onClick: () => console.log('Action clicked'),
	content: <p>Default Content</p>,
	isToggled: false,
};

FilterAction.propTypes = {
	title: PropTypes.string,
	onClick: PropTypes.func,
	content: PropTypes.object,
	isToggled: PropTypes.bool,
};

export default FilterAction;
