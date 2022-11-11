import * as React from 'react';
import PropTypes from 'prop-types';

import { useFormikContext } from 'formik';

import Settings from '../../../../../settings';

import { Accordion, Listbox, Switch } from '../../../../Core';
import FilterTitle from '../../FilterTitle/FilterTitle';

const WhereToWatch = ({ isAuthenticated, ottProviders }) => {
	const { values, setFieldValue } = useFormikContext();

	const MyServicesTooltip = React.useMemo(() => {
		// No Ott Providers available
		if (ottProviders.length === 0) {
			return "This filter has been disabled as you don't have any 'Service Providers' at this time.";
		}

		// Authenticated tooltip
		if (isAuthenticated === true) {
			return `Click to ${
				values.restrict_services === true ? 'remove' : 'add'
			} your service providers from the Services Provider dropdown`;
		}

		// The default My Services tooltip
		return 'Log in to manage your subscribed services.';
	}, [isAuthenticated, ottProviders, values.restrict_services]);

	return (
		<Accordion title={<h3 className='text-lg text-black'>Where to watch</h3>} contentClassName=''>
			<div className='block border-b-[1px] border-solid border-gray-300 p-4 '>
				<FilterTitle title='My Services' tooltip={MyServicesTooltip} />

				<Switch
					onChange={({ value }) => {
						// Update the switch value
						setFieldValue('restrict_services', value);

						// If the value is true thenmerge your current with_ott_providers and your current ottProviders
						if (value === true) {
							setFieldValue('with_ott_providers', [...values.with_ott_providers, ...ottProviders]);
						}

						// If the value is false then remove your ott providers but keep your other values
						if (value === false) {
							setFieldValue('with_ott_providers', [
								...values.with_ott_providers.filter((el) => ottProviders.includes(el) === false)
							]);
						}
					}}
					value={values.restrict_services}
					defaultValue={undefined}
					name='restrict_services'
					disabled={ottProviders.length === 0} // Disable the switch when there are no Service Providers
					label='Restrict searches to my subscribed services?'
				/>
			</div>

			<div className='block space-y-3 p-4'>
				<label htmlFor='ott_region' className='mb-2 block font-light'>
					<FilterTitle
						title='Region'
						tooltip='Filter the Services providers list by selecting a region'
					/>

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
				</label>

				<label htmlFor='with_ott_providers' className='mb-2 block pt-4 font-light'>
					<FilterTitle
						title='Services providers'
						tooltip='Filter by Service Providers by selection one or more providers'
					/>

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
				</label>
			</div>
		</Accordion>
	);
};

WhereToWatch.propTypes = {
	isAuthenticated: PropTypes.bool,
	ottProviders: PropTypes.arrayOf(PropTypes.string)
};

WhereToWatch.defaultProps = {
	isAuthenticated: false,
	ottProviders: [
		Settings.OTT_PROVIDER_OPTIONS[5].value,
		Settings.OTT_PROVIDER_OPTIONS[8].value,
		Settings.OTT_PROVIDER_OPTIONS[9].value,
		Settings.OTT_PROVIDER_OPTIONS[10].value,
		Settings.OTT_PROVIDER_OPTIONS[15].value,
		Settings.OTT_PROVIDER_OPTIONS[4].value
	]
};

export default WhereToWatch;
