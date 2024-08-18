import * as React from 'react';
import { useFormikContext } from 'formik';

import Settings from '../../../../../settings';
import { Accordion, Listbox, Switch } from '../../../../Core';
import FilterTitle from '../../FilterTitle';
import { SelectOption } from '../../../../../types/DropdownElementTypes';
import DiscoverFiltersFormDataService from '../../../../../services/DiscoverFiltersFormDataService/DiscoverFiltersFormDataService';

type WhereToWatchProps = {
	isAuthenticated?: boolean;
	ottProviders?: SelectOption[];
};

const WhereToWatch = ({ isAuthenticated = false, ottProviders = [] }: WhereToWatchProps) => {
	// Access the templates current from values, the return type is inferred from the return of getFormikFormData
	const { values, setFieldValue } =
		useFormikContext<ReturnType<DiscoverFiltersFormDataService['getFormikFormData']>>();

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
		<Accordion
			title={<h2 className='text-lg text-black'>Where to watch</h2>}
			contentClassName='mb-4'
			containerClassName='z-[3]'
		>
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
					disabled={ottProviders.length === 0 || isAuthenticated === false} // Disable the switch when there are no Service Providers
					label='Restrict searches to my subscribed services?'
					showLabelOnTheRight={false}
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
						isMultiSelect={false}
						name='ott_region'
						defaultValue={undefined}
						disabled={false}
						displayLimit={3}
						noOptionsAvailableMessage='No countries available to choose from'
						truncateText={false}
					/>
				</label>

				<label htmlFor='with_ott_providers' className='mb-2 block pt-4 font-light'>
					<FilterTitle
						title='Services providers'
						tooltip='Filter by Service Providers by selection one or more providers'
					/>

					<Listbox
						options={ottProviders}
						value={values.with_ott_providers}
						onChange={({ value }) => {
							setFieldValue('with_ott_providers', value);
						}}
						isMultiSelect
						name='with_ott_providers'
						defaultValue={undefined}
						disabled={false}
						displayLimit={1}
						noOptionsAvailableMessage='No providers available to choose from for your current region'
						truncateText={false}
					/>
				</label>
			</div>
		</Accordion>
	);
};

export default WhereToWatch;
