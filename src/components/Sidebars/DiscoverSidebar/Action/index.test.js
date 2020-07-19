import React from 'react';
import { fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import Action from './index';
import createDOMElement from '../../../../utils/testUtils/createDOMElement';

describe('Action tests', () => {
	describe('onClick', () => {
		it('The mocked onClick should be called and called only once', () => {
			// Arrange
			const onClick = jest.fn();

			// Act
			const element = createDOMElement(<Action title='onClick' onClick={onClick} />, 'h3');
			fireEvent.click(element);

			// Assert
			expect(onClick).toHaveBeenCalled();
			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('title', () => {
		it('Should return custom title', () => {
			// Arrange and Act
			const element = createDOMElement(<Action title='Custom Title' />, 'h3');

			// Assert
			expect(element.textContent).toBe('Custom Title');
			expect(element.textContent).toBeTruthy();
		});

		it('Should return the default title', () => {
			// Arrange and Act
			const element = createDOMElement(<Action />, 'h3');

			// Assert
			expect(element.textContent).toBe('title');
			expect(element.textContent).toBeTruthy();
		});
	});

	describe('isToggled', () => {
		it('aria-expanded should be false', () => {
			// Arrange and Act
			const element = createDOMElement(<Action />, 'div[aria-expanded=false]');

			// Assert
			expect(element).toBeTruthy();
		});

		it('aria-expanded should be true', () => {
			// Arrange and Act
			const element = createDOMElement(<Action isToggled />, 'div[aria-expanded=true]');

			// Assert
			expect(element).toBeTruthy();
		});
	});

	describe('content', () => {
		it('Should return "Default content" ', () => {
			// Arrange and Act
			const element = createDOMElement(<Action />, 'div[aria-expanded=false]');

			// Assert
			expect(element.textContent).toBe('Default Content');
			expect(element.textContent).toBeTruthy();
		});

		it('Should return "Custom content" ', () => {
			// Arrange and Act
			const element = createDOMElement(
				<Action content={<p>Custom Content</p>} />,
				'div[aria-expanded=false]',
			);

			// Assert
			expect(element.textContent).toBe('Custom Content');
			expect(element.textContent).toBeTruthy();
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			// Arrange and Act
			const element = createDOMElement(<Action />, 'div');
			const result = await axe(element);

			// Assert
			expect(result).toHaveNoViolations();
		});
	});
});
