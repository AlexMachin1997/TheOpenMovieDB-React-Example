import * as React from 'react';

import { useFormikContext } from 'formik';

import Settings from '../../../../settings';

import { Accordion, Listbox } from '../../../Core';

const Sort = () => {
	const { values, setFieldValue } = useFormikContext();

	return (
		<Accordion title={<h3 className='text-lg text-black'>Sort</h3>}>
			<label htmlFor='sort_by'>
				{/* Dropdown label */}
				<span className='mb-2 block font-light'>Sort Results By</span>

				{/* Dropdown component */}
				<Listbox
					value={values.sort_by}
					onChange={({ value }) => {
						setFieldValue('sort_by', value);
					}}
					options={Settings.SORT_BY_OPTIONS}
					isMulti={false}
					displayName='label'
					name='sort_by'
					defaultValue={undefined}
					disabled={false}
					noOptionsAvailableMessage='No sort by options available at this time.'
				/>
			</label>
		</Accordion>
	);
};

export default Sort;
