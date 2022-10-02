import * as React from 'react';

import { useFormikContext } from 'formik';

import classNames from 'classnames';
import Settings from '../../../../settings';

import { Accordion, CheckboxGroup, Combobox, Listbox, RadioGroup } from '../../../Core';

const Filters = () => {
	const { values, setFieldValue } = useFormikContext();

	const onChangeCheckboxGroup = ({
		idOfTheCheckboxElement = '',
		checkboxOptions = [],
		newCheckboxValues = [],
		currentCheckboxValues = []
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
	};

	return (
		<Accordion title={<h3 className='text-lg text-black'>Filters</h3>}>
			<label htmlFor='show_me' className='block border-b-[1px] border-solid border-gray-300 pb-3'>
				{/* Dropdown label */}
				<span className='mb-2 block font-light'>Show Me</span>

				{/* Dropdown component */}
				<RadioGroup
					options={Settings.SHOW_ME_RADIO_OPTIONS}
					value={values.show_me}
					onChange={({ value }) => {
						setFieldValue('show_me', value);
					}}
					displayName='label'
					noOptionsAvailableMessage="Looks like there are now 'Show Me' options available"
					disabled={false}
					showRadioButtonOnTheLeft
					addSpaceBetweenLabelAndRadioButton={false}
					name='show_me'
					getRadioOptionClassName={() =>
						'cursor-pointer rounded-lg focus:outline-none bg-white relative flex'
					}
					getRadioLabelClassName={() => 'text-black'}
					getIconColour={({ isChecked }) =>
						classNames('fa-lg', {
							'text-secondary': isChecked === true,
							'text-gray-300': isChecked === false
						})
					}
					defaultValue={undefined}
				/>
			</label>

			<div className='block border-b-[1px] border-solid border-gray-300 pb-3 pt-3'>
				{/* Dropdown label */}
				<span className='mb-2 block font-light'>Release Types</span>

				{/* Dropdown component */}
				<CheckboxGroup
					options={
						values.with_release_type.includes('all') === true
							? [Settings.RELEASE_TYPE_OPTIONS[0]]
							: Settings.RELEASE_TYPE_OPTIONS
					}
					value={values.with_release_type}
					onChange={({ value, elementClicked }) => {
						// Get the new checkbox group value
						const newCheckboxValues = onChangeCheckboxGroup({
							idOfTheCheckboxElement: elementClicked,
							checkboxOptions: Settings.RELEASE_TYPE_OPTIONS,
							newCheckboxValues: value,
							currentCheckboxValues: values.with_release_type
						});

						// // Update Formik state with the new options
						setFieldValue('with_release_type', [...newCheckboxValues]);
					}}
					displayName='label'
					noOptionsAvailableMessage='No release type options available'
					disabled={false}
					name='with_release_type'
					defaultValue={undefined}
				/>
			</div>

			<div className='block border-b-[1px] border-solid border-gray-300 pb-3 pt-3'>
				{/* Dropdown label */}
				<span className='mb-2 block font-light'>Availabilities</span>

				{/* Dropdown component */}
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
					displayName='label'
					noOptionsAvailableMessage='No availability options available'
					disabled={false}
					name='with_ott_monetization_types'
					defaultValue={undefined}
				/>
			</div>

			<label
				htmlFor='with_genres'
				className='block border-b-[1px] border-solid border-gray-300 pb-3 pt-3'
			>
				{/* Dropdown label */}
				<span className='mb-2 block font-light'>Genres</span>

				{/* Dropdown component */}
				<Listbox
					value={values.with_genres}
					onChange={({ value }) => {
						setFieldValue('with_genres', value);
					}}
					options={Settings.GENRE_OPTIONS}
					isMulti
					displayName='label'
					name='with_genres'
					defaultValue={undefined}
					disabled={false}
					noOptionsAvailableMessage='No genre options available.'
				/>
			</label>

			<label
				htmlFor='certification'
				className='block border-b-[1px] border-solid border-gray-300 pb-3 pt-3'
			>
				{/* Dropdown label */}
				<span className='mb-2 block font-light'>Certification</span>

				{/* Dropdown component */}
				<Listbox
					value={values.certification}
					onChange={({ value }) => {
						setFieldValue('certification', value);
					}}
					options={Settings.CERTIFICATION_OPTIONS}
					isMulti
					displayName='label'
					name='certification'
					defaultValue={undefined}
					disabled={false}
					noOptionsAvailableMessage='No certification options available.'
				/>
			</label>

			<label
				htmlFor='with_original_language'
				className='block border-b-[1px] border-solid border-gray-300 pb-3 pt-3'
			>
				<span className='mb-2 block font-light'>Certification</span>

				<Listbox
					value={values.with_original_language}
					onChange={({ value }) => {
						setFieldValue('with_original_language', value);
					}}
					options={Settings.LANGUAGE_OPTIONS}
					isMulti
					displayName='label'
					name='with_original_language'
					defaultValue={undefined}
					disabled={false}
					noOptionsAvailableMessage='No languages options available.'
				/>
			</label>
		</Accordion>
	);
};

export default Filters;
