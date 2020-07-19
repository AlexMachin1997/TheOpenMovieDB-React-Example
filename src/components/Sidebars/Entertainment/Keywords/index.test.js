import React from 'react';
import { fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import Keywords from './index';

import createDOMElement from '../../../../utils/testUtils/createDOMElement';

describe('Action tests', () => {
	describe('keywords', () => {
		it('It Should have a default default length of 1', () => {
			// Arrange and act
			const element = createDOMElement(<Keywords />, 'div').firstChild;

			// Asset
			expect(element.childElementCount).toBe(1);
		});

		it('It should have a length of 5', () => {
			// Arrange and act
			const element = createDOMElement(
				<Keywords keywords={['Thriller', 'Horror', 'Action', 'Drama']} />,
				'#Keywords div',
			);

			// Asset
			expect(element.childElementCount).toBe(4);
		});
	});

	describe('onClick', () => {
		it('The Thriller onClick should be fired once', () => {
			// Arrange
			const onClick = jest.fn();

			const element = createDOMElement(
				<Keywords keywords={['Thriller', 'Horror', 'Action', 'Drama']} onClick={onClick} />,
				'#Keywords #Thriller',
			);

			// Act
			fireEvent.click(element);

			// Assert
			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			// Arrange and Act
			const element = createDOMElement(
				<Keywords keywords={['Thriller', 'Horror', 'Action', 'Drama']} />,
				'#Keywords',
			);
			const result = await axe(element);

			// Assert
			expect(result).toHaveNoViolations();
		});
	});
});
