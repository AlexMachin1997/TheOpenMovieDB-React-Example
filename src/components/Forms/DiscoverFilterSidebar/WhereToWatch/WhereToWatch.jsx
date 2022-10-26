import * as React from 'react';

import { useFormikContext } from 'formik';

import Settings from '../../../../settings';

import { Accordion, Listbox, Switch } from '../../../Core';

const WhereToWatch = () => {
	const { values, setFieldValue } = useFormikContext();

	return (
		<Accordion title={<h3 className='text-lg text-black'>Where to watch</h3>} contentClassName=''>
			<div className='block border-b-[1px] border-solid border-gray-300 p-4 '>
				{/* Dropdown label */}
				<span className='mb-2 block font-light'>My Services</span>

				{/* A switch input to toggle the */}
				<Switch
					onChange={({ value }) => {
						// Update the switch value
						setFieldValue('restrict_services', value);

						// If the user is restricting there services to the subscribed services then update the provider s dropdown with the options, otherwise clear the input
						if (value === true) {
							// TODO: Read values from the current users providers e.g. Netflix, Disney Plus etc
							setFieldValue('with_ott_providers', [
								Settings.OTT_PROVIDER_OPTIONS[5].value,
								Settings.OTT_PROVIDER_OPTIONS[8].value,
								Settings.OTT_PROVIDER_OPTIONS[9].value,
								Settings.OTT_PROVIDER_OPTIONS[10].value,
								Settings.OTT_PROVIDER_OPTIONS[15].value,
								Settings.OTT_PROVIDER_OPTIONS[4].value
							]);
						} else {
							setFieldValue('with_ott_providers', []);
						}
					}}
					value={values.restrict_services}
					defaultValue={undefined}
					name='restrict_services'
					disabled={false}
					label='Restrict searches to my subscribed services?'
				/>
			</div>

			<div className='block  p-4'>
				{/* Label, is actually a label as the Listbox doesn't have one */}
				<label htmlFor='ott_region' className='mb-2 block font-light'>
					Region
				</label>

				{/* Dropdown component, this allows you to select a country which are used for the "Release Region" filter */}
				<Listbox
					options={Settings.COUNTRY_OPTIONS}
					value={values.ott_region}
					onChange={({ value }) => {
						setFieldValue('ott_region', value);
					}}
					isMulti={false}
					displayName='label'
					name='ott_region'
					defaultValue={undefined}
					disabled={false}
					displayLimit={3}
					noOptionsAvailableMessage='No countries available to choose from'
				/>

				{/* Label, is actually a label as the Listbox doesn't have one */}
				<label htmlFor='with_ott_providers' className='mb-2 block pt-4 font-light'>
					Services providers (For selected region)
				</label>

				{/* Dropdown component, this allows you to select a country which are used for the "Release Region" filter */}
				<Listbox
					options={Settings.OTT_PROVIDER_OPTIONS}
					value={values.with_ott_providers}
					onChange={({ value }) => {
						setFieldValue('with_ott_providers', value);
					}}
					isMulti
					displayName='label'
					name='with_ott_providers'
					defaultValue={undefined}
					disabled={false}
					displayLimit={1}
					noOptionsAvailableMessage='No providers available to choose from for your current region'
				/>
			</div>
		</Accordion>
	);
};

export default WhereToWatch;
