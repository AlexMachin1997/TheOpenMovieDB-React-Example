import * as React from 'react';
import Settings from '../../settings';

import CountryFlag from './CountryFlag';

const Template = () => (
	<div className='grid grid-cols-5'>
		{Settings.COUNTRY_OPTIONS.map((country) => (
			<div key={country.iso_3166_1} className='flex items-center'>
				<span className='mr-3'>
					<CountryFlag countryCode={country.iso_3166_1} />
				</span>
				<p>
					{country.iso_3166_1} - {country.english_name}
				</p>
			</div>
		))}
	</div>
);

export const Default = Template.bind({});
Default.args = {};

export default {
	title: 'Design System/Country Flag',
	component: CountryFlag
};
