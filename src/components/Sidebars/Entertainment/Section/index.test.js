import React from 'react';
import { axe } from 'jest-axe';

import Section from './index';
import createDOMElement from '../../../../utils/testUtils/createDOMElement';

describe('Section tests', () => {
	describe('display', () => {
		it('Should not be in the DOM', () => {
			const el = createDOMElement(<Section display={false} />, 'body');
			expect(el).not.toBeInTheDocument();
		});

		it('Should be in the DOM', () => {
			const el = createDOMElement(<Section />, 'div');
			expect(el).toBeInTheDocument();
		});
	});

	describe('title', () => {
		it('Should return the default title', () => {
			const el = createDOMElement(<Section />, 'h3');
			expect(el.textContent).toBe('title');
		});

		it('Should return a custom title', () => {
			const el = createDOMElement(<Section title="Hello" />, 'h3');
			expect(el.textContent).toBe('Hello');
		});
	});

	describe('content', () => {
		it('Should return the default content', () => {
			// Arrange and act
			const element = createDOMElement(<Section />, '#title div');

			// Assert
			expect(element.textContent).toBe('Example content');
			expect(element).toBeTruthy();
		});

		it('Should return the custom jsx', () => {
			// Arrange and act
			const element = createDOMElement(<Section content={<p>Title</p>} />, '#title div');

			// Assert
			expect(element.textContent).toBe('Title');
			expect(element).toBeTruthy();
		});

		it('Should return the custom text', () => {
			// Arrange and act
			const element = createDOMElement(<Section content="Title" />, '#title div');

			// Assert
			expect(element.textContent).toBe('Title');
			expect(element).toBeTruthy();
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			// Arrange and act
			const el = createDOMElement(<Section />, 'div');
			const result = await axe(el);

			// Assert
			expect(result).toHaveNoViolations();
		});
	});
});
