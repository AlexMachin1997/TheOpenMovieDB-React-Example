import React from 'react';
import { axe } from 'jest-axe';

import Section from './index';
import createDOMElement from '../../../../utils/testUtils/createDOMElement';

describe('Section tests', () => {
	describe('title', () => {
		it('It should return the default title', () => {
			// Arrange and act
			const element = createDOMElement(<Section />, '#title h2');

			// Assert
			expect(element.textContent).toBe('title');
			expect(element).toBeTruthy();
		});

		it('Should return a custom title', () => {
			// Arrange and act
			const element = createDOMElement(<Section title="Custom title" />, '#Custom-title h2');

			// Assert
			expect(element.textContent).toBe('Custom title');
			expect(element).toBeTruthy();
		});
	});

	describe('Content', () => {
		it('Should return the default content', () => {
			// Arrange and act
			const element = createDOMElement(<Section />, '#title div');

			// Assert
			expect(element.textContent).toBe('Default content');
			expect(element).toBeTruthy();
		});

		it('Should return custom JSX', () => {
			// Arrange and act
			const element = createDOMElement(<Section content={<p>Title</p>} />, '#title div');

			// Assert
			expect(element.textContent).toBe('Title');
			expect(element).toBeTruthy();
		});

		it('Should return custom text', () => {
			// Arrange and act
			const element = createDOMElement(<Section title="Title" />, '#Title div');

			// Assert
			expect(element.textContent).toBe('Default content');
			expect(element).toBeTruthy();
		});

		it('Should have a length of 2', () => {
			// Arrange and act
			const element = createDOMElement(<Section content={['Alex Machin', 'Biscuits']} />, 'div');
			const numberOfElements = element.getElementsByTagName('h3').length;

			// Assert
			expect(numberOfElements).toBe(2);
		});
	});

	describe('display', () => {
		it('Should not be in the DOM', () => {
			const element = createDOMElement(<Section display={false} />, 'body');
			expect(element).not.toBeInTheDocument();
		});

		it('Should be in the DOM', () => {
			const element = createDOMElement(<Section />, 'div');
			expect(element).toBeInTheDocument();
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			const element = createDOMElement(<Section />, 'div');

			const result = await axe(element);

			expect(result).toHaveNoViolations();
		});
	});
});
