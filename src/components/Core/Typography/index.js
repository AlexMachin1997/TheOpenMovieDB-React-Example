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
	Paragraph
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
	htmlFor
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
				>
					{text}
				</Label>
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
	height: PropTypes.number,
	size: PropTypes.string,
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
	type: PropTypes.string,
	colour: PropTypes.string,
	newTab: PropTypes.bool,
	href: PropTypes.string,
	htmlFor: PropTypes.string
};

export default Heading;
