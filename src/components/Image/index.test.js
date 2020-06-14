import React from 'react';
import { axe } from 'jest-axe';

import Image from './index';
import createDOMElement from '../../utils/testUtils/createDOMElement';

describe('Image tests', () => {
	describe('width', () => {
		it('Should have a default width of 200px', () => {
			// Arrange and act
			const element = createDOMElement(<Image />, 'img');

			// Assert
			expect(element).toHaveStyle('width: 200px');
		});

		it('Should have a custom width of 500px', () => {
			// Arrange and act
			const element = createDOMElement(<Image width="500px" />, 'img');

			// Assert
			expect(element).toHaveStyle('width: 500px');
		});
	});

	describe('height', () => {
		it('Should have a default height of 200px', () => {
			// Arrange and act
			const element = createDOMElement(<Image />, 'img');

			// Assert
			expect(element).toHaveStyle('height: 200px');
		});

		it('Should have a custom height of 500px', () => {
			// Arrange and act
			const element = createDOMElement(<Image height="500px" />, 'img');

			// Assert
			expect(element).toHaveStyle('height: 500px');
		});
	});

	describe('border-radius', () => {
		it('Sould have a default border-radius of 8px', () => {
			// Arrange and act
			const element = createDOMElement(<Image />, 'img');

			// Assert
			expect(element).toHaveStyle('border-radius: 8px;');
		});

		it('Sould have a custom border-radius of 8px', () => {
			// Arrange and act
			const element = createDOMElement(<Image borderRadius="10px" />, 'img');

			// Assert
			expect(element).toHaveStyle('border-radius: 10px;');
		});
	});

	describe('border', () => {
		it('Should have a default border of transparent', () => {
			// Arrange and act
			const element = createDOMElement(<Image />, 'img');

			// Assert
			expect(element).toHaveStyle('border: transparent');
		});
		it('Should have a custom border of 1px solid black', () => {
			// Arrange and act
			const element = createDOMElement(<Image border="1px solid black" />, 'img');

			// Assert
			expect(element).toHaveStyle('border: 1px solid black');
		});
	});

	describe('label', () => {
		it('Should return the default aria-label', () => {
			// Arrange and act
			const element = createDOMElement(<Image />, 'img[aria-label=Default]');

			// Assert
			expect(element).toBeTruthy();
		});

		it('Should have a custom aria-label', () => {
			// Arrange and act
			const element = createDOMElement(<Image label="Custom" />, 'img[aria-label=Custom]');

			// Assert
			expect(element).toBeTruthy();
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			const element = createDOMElement(
				<Image
					alt="Alt"
					width="200px"
					height="200px"
					label="Alt"
					borderRadius="16px"
					src="https://image.tmdb.org/t/p/w1280/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg"
				/>,
				'img'
			);

			const result = await axe(element);

			expect(result).toHaveNoViolations();
		});
	});
});
