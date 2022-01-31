import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { axe } from 'jest-axe';
import { fireEvent } from '@testing-library/react';

import Button from './index';
import { lightTheme, darkTheme } from '../../theme';

import createDOMElement from '../../../utils/testUtils/createDOMElement';

const stylingCheck = (expectedResult, props, theme = lightTheme) => {
	// Arrange and act
	const element = createDOMElement(
		<ThemeProvider theme={theme}>
			<Button {...props} id='example-id' />
		</ThemeProvider>,
		'button'
	);

	// Assert
	expect(element).toHaveStyle(expectedResult);
};

describe('Button tests', () => {
	describe('transform', () => {
		it('Should return the default transform', () => {
			stylingCheck('text-transform: uppercase', {});
		});

		it('Should retuern the custom transform', () => {
			stylingCheck('text-transform: lowercase', { transform: 'lowercase' });
		});
	});

	describe('content', () => {
		it('Should return the default text', () => {
			// Arrange and act
			const element = createDOMElement(<Button id='example-id' />, 'button');

			// Assert
			expect(element.innerHTML).toBe('Default');
		});

		it('Should return the custom text', () => {
			// Arrange and act
			const element = createDOMElement(
				<Button id='example-id' content='Custom Content' />,
				'button'
			);

			// Assert
			expect(element.innerHTML).toBe('Custom Content');
		});
	});

	describe('background', () => {
		it('Should return the default background', () => {
			stylingCheck('background-color: transparent', {});
		});

		it('Should return the custom background', () => {
			stylingCheck('background-color: red', { background: 'red' });
		});
	});

	describe('border', () => {
		it('Should return the default border', () => {
			stylingCheck('border: none');
		});

		it('Should return the custom border', () => {
			stylingCheck('border: 1px solid red', { border: '1px solid red' });
		});
	});

	describe('colour', () => {
		it('Should return the default colour (lightTheme)', () => {
			stylingCheck('color: black', {}, lightTheme);
		});

		it('Should return the default colour (darkTheme)', () => {
			stylingCheck('color: white', {}, darkTheme);
		});

		it('Should return the custom colour ', () => {
			stylingCheck('color: red', { colour: 'red' });
		});
	});

	describe('isDisabled', () => {
		it('Should return the pointer if the button is disabled', () => {
			stylingCheck('cursor: pointer', {});
		});

		it('Should return the pointer if the button is disabled', () => {
			stylingCheck('cursor: not-allowed', { isDisabled: true });
		});
	});

	describe('borderRadius', () => {
		it('Should return the default borderRadius', () => {
			stylingCheck('border-radius: 0 0 0 0', {});
		});

		it('Should return the custom borderRadius', () => {
			stylingCheck('border-radius: 1rem', { borderRadius: '1rem' });
		});
	});

	describe('ariaLabel', () => {
		it('Should return the default ariaLabel', () => {
			// Arrange and act
			const element = createDOMElement(<Button id='example-id' />, `button[aria-label='label']`);

			// Assert
			expect(element).toBeTruthy();
		});

		it('Should return the default ariaLabel', () => {
			const element = createDOMElement(
				<Button ariaLabel='Custom Label' id='example-id' />,
				"button[aria-label='custom-label'"
			);

			expect(element).toBeTruthy();
		});
	});

	describe('onClick', () => {
		it('The onClick should be called once', () => {
			// Arrange
			const onClick = jest.fn();

			// Act
			const element = createDOMElement(<Button onClick={onClick} id='example-id' />, 'button');
			fireEvent.click(element);

			// Assert
			expect(onClick).toHaveBeenCalled();
			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('type', () => {
		it('The default button type should be button', () => {
			// Arrange and act
			const element = createDOMElement(<Button id='example-id' />, `button[type=button]`);

			// Assert
			expect(element).toBeTruthy();
		});
		it('The custom type for the button should be button', () => {
			// Arrange and act
			const element = createDOMElement(
				<Button type='submit' id='example-id' />,
				`button[type=submit]`
			);

			// Assert
			expect(element).toBeTruthy();
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			// Arrange and act
			const element = createDOMElement(<Button id='example-id' />, 'button');
			const result = await axe(element);

			// Assert
			expect(result).toHaveNoViolations();
		});
	});
});
