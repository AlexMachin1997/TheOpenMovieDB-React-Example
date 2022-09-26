import * as React from 'react';
import PropTypes from 'prop-types';

import Settings from '../../../../settings';

import { Accordion, Listbox } from '../../../Core';

const Sort = ({ defaultFormData }) => (
	<Accordion title={<h3 className='text-lg text-black'>Sort</h3>}>
		<label htmlFor='sort_by'>
			{/* Dropdown label */}
			<span className='mb-2 block font-light'>Sort Results By</span>

			{/* Dropdown component */}
			<Listbox
				value={undefined} // TODO: Inject with the value from Formik
				onChange={null} // This will be used to update the Formik value
				options={Settings.SORT_BY_OPTIONS} // Hardcoded options from the config
				isMulti={false} // Used to decide weather the value is multi select or not, sortBy is a single select
				displayName='label' // The value which should be used as the display name from the options e.g. {label: "A to Z", value: "A"}
				name='sort_by' // The html formData name, useful when wanting to access the formData object without Formik
				defaultValue={defaultFormData.sort_by} // The default value, by default it's the first option from the SORT_BY_OPTIONS
				disabled={false} // Is this filter disabled ?
				noOptionsAvailableMessage='No sort by options available at this time.' // When there are no options available it should output this message
			/>
		</label>
	</Accordion>
);

Sort.propTypes = {
	defaultFormData: PropTypes.object
};

Sort.defaultProps = {
	defaultFormData: {
		sort_by: Settings.SORT_BY_OPTIONS[0].value
	}
};

export default Sort;
