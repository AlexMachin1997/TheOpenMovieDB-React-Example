import * as React from 'react';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';

import Image from './Image';

describe('Image tests', () => {
	it('When the image has a height specified it should use that value', () => {
		render(<Image height='200px' />);

		expect(screen.getByRole('img')).toHaveStyle('height: 200px');
	});

	it('When the image has a width specified it should use that value', () => {
		render(<Image width='200px' />);

		expect(screen.getByRole('img')).toHaveStyle('width: 200px');
	});

	it('When the image has a alt tag specified it should you that value', () => {
		render(<Image alt='My awesome alt tag' />);

		expect(screen.getByAltText('My awesome alt tag')).toBeInTheDocument();
	});

	it('When the image src is provided it should render that image', () => {
		render(<Image src='https://via.placeholder.com/200x200?text=Default+Image' />);

		expect(screen.getByRole('img')).toHaveAttribute(
			'src',
			'https://via.placeholder.com/200x200?text=Default+Image'
		);
	});

	it('When the image has a className it should apply that styling', () => {
		render(<Image className='rounded-2xl' />);

		expect(screen.getByRole('img')).toHaveClass('rounded-2xl');
	});

	it('When the image has an alt tag it should use that as the title', () => {
		render(<Image alt='A picture of a famous celebrity at an event' />);

		expect(screen.getByRole('img')).toHaveAttribute(
			'title',
			'A picture of a famous celebrity at an event'
		);
	});

	it('When the default image properties are used it should have no violations', async () => {
		render(<Image />);

		expect(await axe(screen.getByRole('img'))).toHaveNoViolations();
	});

	it('When the custom image properties are used it should have no violations', async () => {
		render(
			<Image
				alt='Alt'
				width='200px'
				height='200px'
				label='Alt'
				src='https://image.tmdb.org/t/p/w1280/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg'
			/>
		);

		expect(await axe(screen.getByRole('img'))).toHaveNoViolations();
	});
});
