import * as React from 'react';
import { useFormikContext } from 'formik';

import Settings from '../../../../../settings';
import { Accordion, CheckboxGroup, Input, Listbox, RadioGroup, Switch } from '../../../../Core';
import FilterTitle from '../../FilterTitle';
import { MEDIA_TYPE } from '../../../../../types/RoutingTypes';
import DiscoverFiltersFormDataService from '../../../../../services/DiscoverFiltersFormDataService/DiscoverFiltersFormDataService';
import { CheckboxOption } from '../../../../../types/DropdownElementTypes';

type FiltersProps = {
	isAuthenticated?: boolean;
	mediaType?: MEDIA_TYPE;
};

const onChangeCheckboxGroup = ({
	idOfTheCheckboxElement = '',
	checkboxOptions = [],
	newCheckboxValues = [],
	currentCheckboxValues = []
}: {
	idOfTheCheckboxElement: string;
	checkboxOptions: CheckboxOption[];
	newCheckboxValues: string[];
	currentCheckboxValues: string[];
}) => {
	// The find 'all' option element id, used to check if we clicked the all option
	const allOptionId = checkboxOptions?.find((el) => el.value === 'all')?.id ?? '';

	// Does the current value include 'all' ?
	const doesYourCurrentSetOfValuesIncludeAll = currentCheckboxValues.includes('all') === true;

	// 1. You have clicked the "All" option and your values don't include 'All'
	if (idOfTheCheckboxElement === allOptionId && doesYourCurrentSetOfValuesIncludeAll === false) {
		// Add all the options which are 'all' (It should only ever be one option)
		return checkboxOptions.filter((el) => el.value === 'all').map((el) => el.value);
	}

	// 2. You clicked the "All" option and your values include 'All'
	if (idOfTheCheckboxElement === allOptionId && doesYourCurrentSetOfValuesIncludeAll === true) {
		// Add all the options which aren't the all value
		return checkboxOptions.filter((el) => el.value !== 'all').map((el) => el.value);
	}

	// 3. You've clicked an option which isn't 'all' so just override the current value with the new array provided by the component
	if (idOfTheCheckboxElement !== allOptionId) {
		// Add all the options which aren't the all value
		return newCheckboxValues;
	}

	// When none of the above is met then just return the current checkbox values don't do any transforming.
	return currentCheckboxValues;
};

const Filters = ({ isAuthenticated, mediaType }: FiltersProps) => {
	// Access the templates current from values, the return type is inferred from the return of getFormikFormData
	const { values, setFieldValue } =
		useFormikContext<ReturnType<DiscoverFiltersFormDataService['getFormikFormData']>>();

	const SHOW_ME_RADIO_OPTIONS = React.useMemo(() => {
		// When the user is authenticated enable all the "Show Me" field options
		if (isAuthenticated === true) {
			return Settings.SHOW_ME_RADIO_OPTIONS.map((d) => ({ ...d, disabled: false }));
		}

		// If the user is not authenticated disable every option
		return Settings.SHOW_ME_RADIO_OPTIONS?.map((d) => {
			if (d.label !== 'Everything') {
				return {
					...d,
					disabled: true
				};
			}

			return { ...d, disabled: false };
		});
	}, [isAuthenticated]);

	return (
		<Accordion
			title={<h3 className='text-lg text-black'>Filters</h3>}
			contentClassName='mb-4'
			containerClassName='z-[2]'
		>
			<label
				htmlFor='show_me'
				className='relative block border-b-[1px] border-solid border-gray-300 p-4'
			>
				<FilterTitle
					title='Show Me'
					tooltip={
						isAuthenticated === true
							? "Filter by what you have AND/OR haven't seen"
							: "Login in to filter by what you have AND/OR haven't seen"
					}
				/>

				<RadioGroup
					options={SHOW_ME_RADIO_OPTIONS}
					value={values.show_me}
					onChange={({ value }) => {
						setFieldValue('show_me', value);
					}}
					noOptionsAvailableMessage="Looks like there are now 'Show Me' options available"
					disabled={false}
					labelPosition='left'
					name='show_me'
					defaultValue={undefined}
				/>
			</label>
			<div className='block border-b-[1px] border-solid border-gray-300 p-4 '>
				<FilterTitle title='Release Types' tooltip='Filter by all or individual release types' />

				<CheckboxGroup
					options={
						values.with_release_types.includes('all') === true
							? [Settings.RELEASE_TYPE_OPTIONS[0]]
							: Settings.RELEASE_TYPE_OPTIONS
					}
					value={values.with_release_types}
					onChange={({ value, elementClicked }) => {
						// Get the new checkbox group value
						const newCheckboxValues = onChangeCheckboxGroup({
							idOfTheCheckboxElement: elementClicked,
							checkboxOptions: Settings.RELEASE_TYPE_OPTIONS,
							newCheckboxValues: value,
							currentCheckboxValues: values.with_release_types
						});

						// // Update Formik state with the new options
						setFieldValue('with_release_types', [...newCheckboxValues]);
					}}
					noOptionsAvailableMessage='No release type options available'
					disabled={false}
					name='with_release_types'
					defaultValue={undefined}
				/>
			</div>

			<div className='block border-b-[1px] border-solid border-gray-300 p-4 '>
				<FilterTitle
					title={mediaType === 'movie' ? 'Release Dates' : 'Air Dates'}
					tooltip='Filter by providing a date range'
				/>

				{/* Date picker's, uses the native html5 date picker's no custom solution needed */}
				<div className='space-y-2'>
					{/* When the mediaType is TV enable this filter to enable users to switch between the first air date or the release date */}
					{mediaType === 'tv' && (
						<Switch
							onChange={({ value }) => {
								setFieldValue('search_first_air_date', value);

								// If you are using searching by first date clear the release date
								if (value === true) {
									setFieldValue(`['release_date.lte]`, '');
									setFieldValue(`['release_date.gte']`, '');
								}

								// If you aren't searching by first date clear the air_date fields
								if (value === false) {
									setFieldValue(`['air_date.lte]`, '');
									setFieldValue(`['air_date.gte']`, '');
								}
							}}
							value={values.search_first_air_date}
							defaultValue={undefined}
							name='with_first_date'
							disabled={false}
							label='Search first air date?'
						/>
					)}

					<Input
						type='date'
						label='From'
						containerClassName='flex items-center'
						labelClassName='w-[100px] text-black'
						id={values.search_first_air_date === true ? `air_date.gte` : `release_date.gte`}
						onChange={(event) => {
							if (values.search_first_air_date === true) {
								setFieldValue(`['air_date.gte']`, event.target.value);
							} else {
								setFieldValue(`['release_date.gte']`, event.target.value);
							}
						}}
						value={
							values.search_first_air_date === true
								? values['air_date.gte']
								: values['release_date.gte']
						}
						name={values.search_first_air_date === true ? 'air_date.gte' : 'release_date.gte'}
					/>
					<Input
						type='date'
						label='To'
						containerClassName='flex items-center'
						labelClassName='w-[100px] text-black'
						id={values.search_first_air_date === true ? `air_date.lte` : `release_date.lte`}
						onChange={(event) => {
							if (values.search_first_air_date === true) {
								setFieldValue(`['air_date.lte']`, event.target.value);
							} else {
								setFieldValue(`['release_date.lte']`, event.target.value);
							}
						}}
						value={
							values.search_first_air_date === true
								? values['air_date.lte']
								: values['release_date.lte']
						}
						name={values.search_first_air_date === true ? 'air_date.lte' : 'release_date.lte'}
					/>
				</div>
			</div>

			<div className='block border-b-[1px] border-solid border-gray-300 p-4'>
				<FilterTitle title='Release region' tooltip='Filter by selecting a release region' />

				<Listbox
					options={Settings.COUNTRY_OPTIONS}
					value={values.region}
					onChange={({ value }) => {
						setFieldValue('region', value);
					}}
					isMultiSelect={false}
					name='region'
					defaultValue={undefined}
					disabled={false}
					displayLimit={3}
					noOptionsAvailableMessage='No countries available to choose from'
					truncateText={false}
				/>
			</div>

			<div className='block border-b-[1px] border-solid border-gray-300 p-4 '>
				<FilterTitle title='Availabilities' tooltip='Filter by all or individual availabilities' />

				{/* Checkbox group options, this allows you select multiple availabilities which are used for the "Availabilities" filter */}
				<CheckboxGroup
					options={
						values.with_ott_monetization_types.includes('all') === true
							? [Settings.AVAILABILITY_OPTIONS[0]]
							: Settings.AVAILABILITY_OPTIONS
					}
					value={values.with_ott_monetization_types}
					onChange={({ value, elementClicked }) => {
						// Get the new checkbox group values
						const newCheckboxGroupOptions = onChangeCheckboxGroup({
							idOfTheCheckboxElement: elementClicked,
							checkboxOptions: Settings.AVAILABILITY_OPTIONS,
							newCheckboxValues: value,
							currentCheckboxValues: values.with_ott_monetization_types
						});

						// Update Formik state with the new options
						setFieldValue('with_ott_monetization_types', [...newCheckboxGroupOptions]);
					}}
					noOptionsAvailableMessage='No availability options available'
					disabled={false}
					name='with_ott_monetization_types'
					defaultValue={undefined}
				/>
			</div>
			<label
				htmlFor='with_genres'
				className='block border-b-[1px] border-solid border-gray-300 p-4 '
			>
				<FilterTitle title='Genres' tooltip='Filter by selecting one or more genres' />

				{/* Dropdown component, this allows you to select multiple genres which are used for the "Genres" filter */}
				<Listbox
					value={values.with_genres}
					onChange={({ value }) => {
						setFieldValue('with_genres', value);
					}}
					options={Settings.GENRE_OPTIONS}
					isMultiSelect
					name='with_genres'
					defaultValue={undefined}
					disabled={false}
					noOptionsAvailableMessage='No genre options available.'
					displayLimit={2}
					truncateText={false}
				/>
			</label>
			<label
				htmlFor='certification'
				className='block border-b-[1px] border-solid border-gray-300 p-4 '
			>
				<FilterTitle
					title='Certifications'
					tooltip='Filter by selecting one or more certifications'
				/>

				{/* Dropdown component, this allows you to select multiple certifications which are used for the "Certification" filter */}
				<Listbox
					value={values.certifications}
					onChange={({ value }) => {
						setFieldValue('certifications', value);
					}}
					options={Settings.CERTIFICATION_OPTIONS}
					isMultiSelect
					name='certifications'
					defaultValue={undefined}
					disabled={false}
					noOptionsAvailableMessage='No certification options available.'
					displayLimit={2}
					truncateText={false}
				/>
			</label>
			<label
				htmlFor='with_original_language'
				className='block border-b-[1px] border-solid border-gray-300 p-4 '
			>
				<FilterTitle title='Language' tooltip='Filter by selecting a language' />

				{/* Dropdown component, this allows you to select a language which will be used for the "Language" filter */}
				<Listbox
					value={values.with_original_language}
					onChange={({ value }) => {
						setFieldValue('with_original_language', value);
					}}
					options={Settings.LANGUAGE_OPTIONS}
					isMultiSelect={false}
					name='with_original_language'
					defaultValue={undefined}
					disabled={false}
					noOptionsAvailableMessage='No languages available'
					truncateText={false}
				/>
			</label>

			<div className='border-b-[1px] border-solid border-gray-300 p-4'>
				<FilterTitle title='Vote average range' tooltip='Filter by providing a number range' />

				<div className='space-y-2'>
					<Input
						type='number'
						min={0}
						max={values['vote_average.lte']} // The minimum score can't go above the maximum score
						step={1}
						inputMode='numeric'
						name='vote_average.gte'
						onChange={(event) => {
							// Get the value as a number
							const value = event.target.valueAsNumber;

							// If the minimum score value is greater than the incoming value from vote_average.lte input set the vote_average.gte to the incoming number
							if (values['vote_average.lte'] < value) {
								setFieldValue("['vote_average.lte']", value);
							}

							// Update this input's value
							setFieldValue("['vote_average.gte']", value);
						}}
						value={values['vote_average.gte']}
						id='vote_average.gte'
						label='Min'
						labelClassName='mb-2 block font-light w-[100px] text-black'
						containerClassName='flex items-center'
					/>

					<Input
						type='number'
						min={0}
						max={10}
						step={1}
						inputMode='numeric'
						name='vote_average.lte'
						onChange={(event) => {
							// Get the value as a number
							const value = event.target.valueAsNumber;

							// If the minimum score value is greater than the incoming value from vote_average.lte input set the vote_average.gte to the incoming number
							if (values['vote_average.gte'] > value) {
								setFieldValue("['vote_average.gte']", value);
							}

							// Update this input's value
							setFieldValue("['vote_average.lte']", value);
						}}
						value={values['vote_average.lte']}
						id='vote_average.lte'
						label='Max'
						labelClassName='mb-2 block font-light w-[100px] text-black'
						containerClassName='flex items-center'
					/>
				</div>
			</div>

			<div className='block space-y-2 border-b-[1px] border-solid border-gray-300 p-4'>
				<Input
					type='number'
					min={0}
					max={500}
					step={50}
					inputMode='numeric'
					name='vote_count.gte'
					onChange={(event) => {
						// Get the value as a number
						const value = event.target.valueAsNumber;

						// Update this input's value
						setFieldValue("['vote_count.gte']", value);
					}}
					value={values['vote_count.gte']}
					id='vote_count.gte'
					label={
						<FilterTitle title='Minimum User Score' tooltip='Filter by providing a user score' />
					}
					labelClassName='mb-2 block font-light text-black'
				/>
			</div>

			<div className='block space-y-2 rounded-b-lg p-4'>
				<FilterTitle title='Runtime' tooltip='Filter by providing a number range' />

				<Input
					type='number'
					min={0}
					max={values['with_runtime.lte']} // The minimum score can't go above the maximum score
					step={10}
					inputMode='numeric'
					name='with_runtime.gte'
					onChange={(event) => {
						// Get the value as a number
						const value = event.target.valueAsNumber;

						// If the minimum score value is greater than the incoming value from vote_average.lte input set the vote_average.gte to the incoming number
						if (values['with_runtime.lte'] < value) {
							setFieldValue("['with_runtime.lte']", value);
						}

						// Update this input's value
						setFieldValue("['with_runtime.gte']", value);
					}}
					value={values['with_runtime.gte']}
					id='with_runtime.gte'
					label='Min'
					labelClassName='mb-2 block font-light w-[100px] text-black'
					containerClassName='flex items-center'
				/>

				{/* An input component, this allows you to specify the maximum runtime. This handles component and label output. */}
				<Input
					type='number'
					min={0}
					max={400}
					step={10}
					inputMode='numeric'
					name='with_runtime.lte'
					onChange={(event) => {
						// Get the value as a number
						const value = event.target.valueAsNumber;

						// If the minimum score value is greater than the incoming value from vote_average.lte input set the vote_average.gte to the incoming number
						if (values['with_runtime.gte'] > value) {
							setFieldValue("['with_runtime.gte']", value);
						}

						// Update this input's value
						setFieldValue("['with_runtime.lte']", value);
					}}
					value={values['with_runtime.lte']}
					id='with_runtime.lte'
					label='Max'
					labelClassName='mb-2 block font-light w-[100px] text-black'
					containerClassName='flex items-center'
				/>
			</div>
		</Accordion>
	);
};

export default Filters;
