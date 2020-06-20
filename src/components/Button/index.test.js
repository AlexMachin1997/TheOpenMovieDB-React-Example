import React from 'react';
import { axe } from 'jest-axe';
import { fireEvent } from '@testing-library/react';

import Button from './index';
import createDOMElement from '../../utils/testUtils/createDOMElement';

const stylingChecks = (expectedResult, props, target = 'button') => {
	// Arrange and act
	const element = createDOMElement(<Button {...props} />, target);

	// Assert
	expect(element).toHaveStyle(expectedResult);
};

describe('Button tests', () => {
	describe('textTransform', () => {
		it('Should return the default textTransform', () => {
			stylingChecks('text-transform: uppercase', {});
		});

		it('Should retuern the custom textTransform', () => {
			stylingChecks('text-transform: lowercase', { textTransform: 'lowercase' });
		});
	});

	describe('content', () => {
		it('Should return the default text', () => {
			// Arrange and act
			const element = createDOMElement(<Button />, 'button');

			// Assert
			expect(element.innerHTML).toBe('Default');
		});

		it('Should return the custom text', () => {
			// Arrange and act
			const element = createDOMElement(<Button content="Custom Content" />, 'button');

			// Assert
			expect(element.innerHTML).toBe('Custom Content');
		});
	});

	describe('backgroundColour', () => {
		it('Should return the default background', () => {
			stylingChecks('background-color: transparent', {});
		});

		it('Should return the custom background', () => {
			stylingChecks('background-color: red', { backgroundColour: 'red' });
		});
	});

	describe('border', () => {
		it('Should return the default border', () => {
			stylingChecks('border: none');
		});

		it('Should return the custom border', () => {
			stylingChecks('border: 1px solid red', { border: '1px solid red' });
		});
	});

	describe('colour', () => {
		it('Should return the default colour', () => {
			stylingChecks('color: black', {});
		});

		it('Should return the custom colour', () => {
			stylingChecks('color: red', { colour: 'red' });
		});
	});

	describe('isDisabled', () => {
		it('Should return the pointer if the button is disabled', () => {
			stylingChecks('cursor: pointer', {});
		});

		it('Should return the pointer if the button is disabled', () => {
			stylingChecks('cursor: not-allowed', { isDisabled: true });
		});
	});

	describe('borderRadius', () => {
		it('Should return the default borderRadius', () => {
			stylingChecks('border-radius: 0 0 0 0', {});
		});

		it('Should return the custom borderRadius', () => {
			stylingChecks('border-radius: 1rem', { borderRadius: '1rem' });
		});
	});

	describe('ariaLabel', () => {
		it('Should return the default ariaLabel', () => {
			// Arrange and act
			const element = createDOMElement(<Button />, 'button[aria-label=label]');

			// Assert
			expect(element).toBeTruthy();
		});

		it('Should return the default ariaLabel', () => {
			// Arrange and act
			const element = createDOMElement(
				<Button ariaLabel="custom label" />,
				'button[aria-label=custom-label]'
			);

			// Assert
			expect(element).toBeTruthy();
		});
	});

	describe('onClick', () => {
		it('The onClick should be called once', () => {
			// Arrange
			const onClick = jest.fn();

			// Act
			const element = createDOMElement(<Button onClick={onClick} />, 'button');
			fireEvent.click(element);

			// Assert
			expect(onClick).toHaveBeenCalled();
			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('type', () => {
		it('The default button type should be button', () => {
			// Arrange and act
			const element = createDOMElement(<Button />, 'button[type=button]');

			// Assert
			expect(element).toBeTruthy();
		});
		it('The custom type for the button should be button', () => {
			// Arrange and act
			const element = createDOMElement(<Button type="submit" />, 'button[type=submit]');

			// Assert
			expect(element).toBeTruthy();
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			const element = createDOMElement(<Button />, 'button');

			const result = await axe(element);

			expect(result).toHaveNoViolations();
		});
	});
});
