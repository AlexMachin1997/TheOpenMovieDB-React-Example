import React from 'react';
import PropTypes from 'prop-types';

import {
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
	Heading6,
	Label,
	Link,
	Paragraph,
	ListItem
} from './Typography';

const Heading = ({
	type,
	weight,
	height,
	size,
	text,
	colour,
	underline,
	newTab,
	href,
	htmlFor,
	transform
}) => {
	switch (type) {
		case 'h1': {
			return (
				<Heading1
					fontWeight={weight}
					lineHeight={height}
					fontSize={size}
					colour={colour}
					underline={underline}
					transform={transform}
				>
					{text}
				</Heading1>
			);
		}
		case 'h2': {
			return (
				<Heading2
					fontWeight={weight}
					lineHeight={height}
					fontSize={size}
					colour={colour}
					underline={underline}
					transform={transform}
				>
					{text}
				</Heading2>
			);
		}
		case 'h3': {
			return (
				<Heading3
					fontWeight={weight}
					lineHeight={height}
					fontSize={size}
					colour={colour}
					underline={underline}
					transform={transform}
				>
					{text}
				</Heading3>
			);
		}
		case 'h4': {
			return (
				<Heading4
					fontWeight={weight}
					lineHeight={height}
					fontSize={size}
					colour={colour}
					underline={underline}
					transform={transform}
				>
					{text}
				</Heading4>
			);
		}
		case 'h5': {
			return (
				<Heading5
					fontWeight={weight}
					lineHeight={height}
					fontSize={size}
					colour={colour}
					underline={underline}
					transform={transform}
				>
					{text}
				</Heading5>
			);
		}
		case 'h6': {
			return (
				<Heading6
					fontWeight={weight}
					lineHeight={height}
					fontSize={size}
					colour={colour}
					underline={underline}
					transform={transform}
				>
					{text}
				</Heading6>
			);
		}

		case 'p': {
			return (
				<Paragraph
					fontWeight={weight}
					lineHeight={height}
					fontSize={size}
					colour={colour}
					underline={underline}
					transform={transform}
				>
					{text}
				</Paragraph>
			);
		}

		case 'a': {
			return (
				<Link
					fontWeight={weight}
					lineHeight={height}
					fontSize={size}
					colour={colour}
					underline={underline}
					target={newTab === true ? '_blank' : '_self'}
					href={href}
					transform={transform}
				>
					{text}
				</Link>
			);
		}

		case 'label': {
			return (
				<Label
					fontWeight={weight}
					lineHeight={height}
					fontSize={size}
					colour={colour}
					underline={underline}
					htmlFor={htmlFor}
					transform={transform}
				>
					{text}
				</Label>
			);
		}

		case 'li': {
			return (
				<ListItem
					fontWeight={weight}
					lineHeight={height}
					fontSize={size}
					colour={colour}
					underline={underline}
					transform={transform}
				>
					{text}
				</ListItem>
			);
		}

		default: {
			return (
				<Heading1
					fontWeight={weight}
					lineHeight={height}
					fontSize={size}
					colour={colour}
					underline={underline}
					transform={transform}
				>
					{text}
				</Heading1>
			);
		}
	}
};

Heading.defaultProps = {
	type: 'h1',
	weight: '500',
	height: 1,
	text: 'Default text',
	size: '1rem',
	colour: '',
	newTab: true,
	href: 'https://www.google.com/',
	htmlFor: ''
};

Heading.propTypes = {
	weight: PropTypes.string,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	size: PropTypes.string,
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
	type: PropTypes.string,
	colour: PropTypes.string,
	newTab: PropTypes.bool,
	href: PropTypes.string,
	htmlFor: PropTypes.string
};

export default Heading;
