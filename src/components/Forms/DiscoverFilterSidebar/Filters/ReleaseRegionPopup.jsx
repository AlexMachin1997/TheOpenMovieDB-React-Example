/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';

import settings from '../../../../settings';

import { Icon, RadioGroup } from '../../../Core';
import CountryFlag from '../../../CountryFlag/CountryFlag';

const CustomIcon = React.memo(({ option }) => <CountryFlag countryCode={option?.value ?? ''} />);

const ReleaseRegionPopup = ({ value }) => {
	const [searchTerm, setSearchTerm] = React.useState('');

	return (
		<div className='rounded-xl border border-solid border-gray-400 bg-white'>
			<div className='relative m-3 overflow-hidden rounded-xl border border-solid border-gray-300'>
				<input
					type='text'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='w-full rounded-xl p-2 pr-8 focus-within:bg-gray-300 focus-within:outline-none'
				/>
				<Icon className='fa-solid fa-magnifying-glass absolute right-0 bottom-1 cursor-pointer p-2' />
			</div>

			<div className='m-3 h-[232px] overflow-y-scroll'>
				<RadioGroup
					options={settings.COUNTRY_OPTIONS}
					displayName='label'
					iconComponent={CustomIcon}
					name='country'
					noOptionsAvailableMessage='No countries currently available'
					disabled={false}
					showRadioButtonOnTheLeft
					addSpaceBetweenLabelAndRadioButton={false}
					defaultValue={undefined}
					value=''
				/>
			</div>
		</div>
	);
};

ReleaseRegionPopup.propTypes = {
	value: PropTypes.arrayOf(PropTypes.string)
};

ReleaseRegionPopup.defaultProps = {
	value: ''
};

export default ReleaseRegionPopup;
