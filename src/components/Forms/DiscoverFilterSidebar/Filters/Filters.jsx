import * as React from 'react';
import PropTypes from 'prop-types';

import { useFormikContext } from 'formik';

import classNames from 'classnames';
import Settings from '../../../../settings';

import { Accordion, CheckboxGroup, Listbox, RadioGroup, Input, Icon } from '../../../Core';

const ShowMeFilterIcon = ({
	isChecked,
	isDisabled,
	defaults: { checkedIcon, uncheckedIcon, iconFontFamily, disabledIconCursor, checkedIconColour }
}) => (
	<Icon
		className={classNames(`fa-lg mr-2 align-[-0.15rem]`, {
			// When the radio option is checked use the default checkedIon with a blue font colour
			[`${checkedIcon} text-secondary`]: isChecked === true,

			// When the radio option is not checked use the default uncheckIcon with the default checkedIconColour
			[`${uncheckedIcon} ${checkedIconColour}`]: isChecked === false,

			// When the Radio option or radio group is disabled use the default icon cursor with solid font-family
			[`${disabledIconCursor} fa-solid`]: isDisabled === true,

			// When the Radio option or radio group is not disabled use the default iconFontFamily
			[`${iconFontFamily}`]: isDisabled === false
		})}
	/>
);

ShowMeFilterIcon.propTypes = {
	isChecked: PropTypes.bool.isRequired,
	isDisabled: PropTypes.bool.isRequired,
	defaults: PropTypes.object.isRequired
};

const Filters = ({ isAuthenticated }) => {
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

		// When none of the above is met then just return the current checkbox values don't do any transforming.
		return currentCheckboxValues;
	};

	const SHOW_ME_RADIO_OPTIONS = React.useMemo(() => {
		if (isAuthenticated === true) return Settings.SHOW_ME_RADIO_OPTIONS;

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
		<Accordion title={<h3 className='text-lg text-black'>Filters</h3>} contentClassName=''>
			<label htmlFor='show_me' className='block border-b-[1px] border-solid border-gray-300 p-4'>
				{/* label, is actually a label as the RadioGroup doesn't have a label */}
				<span className='mb-2 block font-light'>Show Me</span>

				{/* Radio group options, this allows you to select one of the "Show me" options which are used for the "Show me" filter */}
				<RadioGroup
					options={SHOW_ME_RADIO_OPTIONS}
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
					getRadioOptionClassName={({ isActive }) =>
						classNames('cursor-pointer rounded-lg focus:outline-none bg-white relative flex', {
							'ring-2 ring-black ring-opacity-60 ring-offset-2 ring-offset-black': isActive === true
						})
					}
					getRadioLabelClassName={({ isDisabled }) =>
						classNames('text-black', {
							'cursor-not-allowed': isDisabled === true
						})
					}
					iconComponent={ShowMeFilterIcon}
					defaultValue={undefined}
				/>
			</label>
			<div className='block border-b-[1px] border-solid border-gray-300 p-4 '>
				{/* label, not actually a label as the Checkbox options have individual labels */}
				<span className='mb-2 block font-light'>Release Types</span>

				{/* Checkbox group options, this allows you select multiple release types which are used for the "Release Types" filter */}
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
			<div className='block border-b-[1px] border-solid border-gray-300 p-4 '>
				{/* Label, not actually a label as the input has it's own individual input */}
				<span className='mb-2 block font-light'>Release Dates</span>

				{/* Date picker's, uses the native html5 date picker's no custom solution needed */}
				<div className='space-y-2'>
					<Input
						type='date'
						label='From'
						containerClassName='flex items-center'
						labelClassName='w-[100px] text-black'
						id='release_date.gte'
						onChange={(event) => {
							setFieldValue("['release_date.gte']", event.target.value);
						}}
						value={values['release_date.gte']}
						name='release_date.gte'
					/>
					<Input
						type='date'
						label='To'
						containerClassName='flex items-center'
						labelClassName='w-[100px] text-black'
						id='release_date.lte'
						onChange={(event) => {
							setFieldValue("['release_date.lte']", event.target.value);
						}}
						value={values['release_date.lte']}
						name='release_date.lte'
					/>
				</div>
			</div>

			<div className='block border-b-[1px] border-solid border-gray-300 p-4'>
				{/* Label, is actually a label as the Listbox doesn't have one */}
				<label htmlFor='region' className='mb-2 block font-light'>
					Release Region
				</label>

				{/* Dropdown component, this allows you to select a country which are used for the "Release Region" filter */}
				<Listbox
					options={Settings.COUNTRY_OPTIONS}
					value={values.region}
					onChange={({ value }) => {
						setFieldValue('region', value);
					}}
					isMulti={false}
					displayName='label'
					name='region'
					defaultValue={undefined}
					disabled={false}
					displayLimit={3}
					noOptionsAvailableMessage='No countries available to choose from'
				/>
			</div>

			<div className='block border-b-[1px] border-solid border-gray-300 p-4 '>
				{/* label, not actually a label as the Checkbox options have individual labels */}
				<span className='mb-2 block font-light'>Availabilities</span>

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
					displayName='label'
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
				{/* Label, is actually a label as the Listbox doesn't have one */}
				<span className='mb-2 block font-light'>Genres</span>

				{/* Dropdown component, this allows you to select multiple genres which are used for the "Genres" filter */}
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
					displayLimit={2}
				/>
			</label>
			<label
				htmlFor='certification'
				className='block border-b-[1px] border-solid border-gray-300 p-4 '
			>
				{/* Label, is actually a label as the Listbox doesn't have one */}
				<span className='mb-2 block font-light'>Certification</span>

				{/* Dropdown component, this allows you to select multiple certifications which are used for the "Certification" filter */}
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
					displayLimit={2}
				/>
			</label>
			<label
				htmlFor='with_original_language'
				className='block border-b-[1px] border-solid border-gray-300 p-4 '
			>
				{/* Label, is actually a label as the Listbox doesn't have one */}
				<span className='mb-2 block font-light'>Language</span>

				{/* Dropdown component, this allows you to select a language which will be used for the "Language" filter */}
				<Listbox
					value={values.with_original_language}
					onChange={({ value }) => {
						setFieldValue('with_original_language', value);
					}}
					options={Settings.LANGUAGE_OPTIONS}
					isMulti={false}
					displayName='label'
					name='with_original_language'
					defaultValue={undefined}
					disabled={false}
					noOptionsAvailableMessage='No languages available'
				/>
			</label>

			<div className='block space-y-2 border-b-[1px] border-solid border-gray-300 p-4'>
				{/* Label, not actually a label as the input has it's own individual input */}
				<span className='mb-2 block font-light'>Vote average range</span>

				{/* An input component, this allows you to specify the minimum vote average score. This handles component and label output. */}
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

				{/* An input component, this allows you to specify the maximum vote average score. This handles component and label output. */}
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

			<div className='block space-y-2 border-b-[1px] border-solid border-gray-300 p-4'>
				{/* An input component, this allows you to specify the Minimum User Votes. This handles component and label output. */}
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
					label='Minimum User Score'
					labelClassName='mb-2 block font-light text-black'
				/>
			</div>

			<div className='block space-y-2 p-4'>
				{/* Label, not actually a label as the input has it's own individual input */}
				<span className='mb-2 block font-light'>Runtime</span>

				{/* An input component, this allows you to specify the minimum runtime. This handles component and label output. */}
				<Input
					type='number'
					min={0}
					max={values['with_runtime.lte']} // The minimum score can't go above the maximum score
					step={15}
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
					step={15}
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

Filters.propTypes = {
	isAuthenticated: PropTypes.bool
};

Filters.defaultProps = {
	isAuthenticated: false
};

export default Filters;
