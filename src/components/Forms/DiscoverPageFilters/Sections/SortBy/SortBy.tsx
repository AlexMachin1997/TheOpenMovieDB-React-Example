import { useFormikContext } from 'formik';

import Settings from '../../../../../settings';
import { Accordion, Listbox } from '../../../../Core';
import FilterTitle from '../../FilterTitle';
import DiscoverFiltersFormDataService from '../../../../../services/DiscoverFiltersFormDataService/DiscoverFiltersFormDataService';

const Sort = () => {
	// Access the templates current from values, the return type is inferred from the return of getFormikFormData
	const { values, setFieldValue } =
		useFormikContext<ReturnType<DiscoverFiltersFormDataService['getFormikFormData']>>();

	return (
		<Accordion
			title={<h2 className='text-lg text-black'>Sort</h2>}
			contentClassName='mb-4'
			defaultIsOpen
			containerClassName='z-[1]'
		>
			<label htmlFor='sort_by' className='block p-4'>
				<FilterTitle title='Sort Results By' tooltip='Sort by selecting a sort by option' />

				<Listbox
					value={values.sort_by}
					onChange={({ value }) => {
						setFieldValue('sort_by', value);
					}}
					options={Settings.SORT_BY_OPTIONS}
					isMultiSelect={false}
					name='sort_by'
					defaultValue={undefined}
					disabled={false}
					noOptionsAvailableMessage='No sort by options available at this time.'
					truncateText={false}
				/>
			</label>
		</Accordion>
	);
};

export default Sort;
