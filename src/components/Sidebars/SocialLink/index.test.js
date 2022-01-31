import * as React from 'react';
import { axe } from 'jest-axe';

import SocialLink from './index';
import createDOMElement from '../../../utils/testUtils/createDOMElement';

describe('SocialLink tests', () => {
	describe('display', () => {
		it('Should not be in the DOM', () => {
			const element = createDOMElement(
				<SocialLink display={false} href='https://www.google.come' />,
				'body'
			);
			expect(element).not.toBeInTheDocument();
		});

		it('Should be in the DOM', () => {
			const element = createDOMElement(<SocialLink href='https://www.google.come' />, 'div');
			expect(element).toBeInTheDocument();
		});
	});

	describe('Accessability test', () => {
		it('No violations should be present', async () => {
			const element = createDOMElement(<SocialLink href='https://www.google.come' />, 'div');

			const result = await axe(element);

			expect(result).toHaveNoViolations();
		});
	});
});
