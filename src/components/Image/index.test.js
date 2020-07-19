import React from 'react';
import { axe } from 'jest-axe';

import Image from './index';
import createDOMElement from '../../utils/testUtils/createDOMElement';

const stylingCheck = (expectedResult, props, target = 'img') => {
	// Arrange and act
	const element = createDOMElement(<Image {...props} />, target);

	// Assert
	expect(element).toHaveStyle(expectedResult);
};

describe('Image tests', () => {
	describe('width', () => {
		it('Should have a default width of 200px', () => {
			stylingCheck('width: 200px', {});
		});

		it('Should have a custom width of 500px', () => {
			stylingCheck('width: 500px', { width: '500px' });
		});
	});

	describe('height', () => {
		it('Should have a default height of 200px', () => {
			stylingCheck('height: 200px', {});
		});

		it('Should have a custom height of 500px', () => {
			stylingCheck('height: 500px', { height: '500px' });
		});
	});

	describe('border-radius', () => {
		it('Sould have a default border-radius of 8px', () => {
			stylingCheck('border-radius: 8px', {});
		});

		it('Sould have a custom border-radius of 1rem', () => {
			stylingCheck('border-radius: 1rem', { borderRadius: '1rem' });
		});
	});

	describe('border', () => {
		it('Should have a default border of transparent', () => {
			stylingCheck('border: transparent', {});
		});

		it('Should have a custom border of 1px solid black', () => {
			stylingCheck('border: 1px solid black', { border: '1px solid black' });
		});
	});

	describe('label', () => {
		it('Should return the default aria-label (Default)', () => {
			// Arrange and act
			const element = createDOMElement(<Image />, 'img[aria-label=Default]');

			// Assert
			expect(element).toBeTruthy();
		});

		it('Should have a custom aria-label (No Spaces)', () => {
			// Arrange and act
			const element = createDOMElement(<Image label='Custom' />, 'img[aria-label=Custom]');

			// Assert
			expect(element).toBeTruthy();
		});

		it('Should have a custom aria-label (With Spaces)', () => {
			// Arrange and act
			const element = createDOMElement(
				<Image label='Custom Lable With Spacing' />,
				'img[aria-label=Custom-Lable-With-Spacing]',
			);

			// Assert
			expect(element).toBeTruthy();
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			const element = createDOMElement(
				<Image
					alt='Alt'
					width='200px'
					height='200px'
					label='Alt'
					borderRadius='16px'
					src='https://image.tmdb.org/t/p/w1280/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg'
				/>,
				'img',
			);

			const result = await axe(element);

			expect(result).toHaveNoViolations();
		});
	});
});
