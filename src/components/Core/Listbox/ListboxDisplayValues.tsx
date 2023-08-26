import classNames from 'classnames';
import { ListboxDisplayValueProps, SelectOption } from '../../../types/DropdownElementTypes';
import Icon from '../Icon/Icon';

const ListboxDisplayValues = ({
	value = null,
	onChange = null,
	displayLimit = 3,
	showMultiDeleteButton = false,
	placeholder = 'Please select'
}: ListboxDisplayValueProps) => {
	const onDeleteItem = (event: React.KeyboardEvent | React.MouseEvent, option: SelectOption) => {
		if (typeof onChange === 'function' && Array.isArray(value)) {
			// Prevent event from bubbling up to the Button's onClick which actually opens the dropdown menu which we don't want.
			event.stopPropagation();

			// Since the delete button has been clicked make sure to pass back every item expect for the one we clicked
			onChange({
				value: value.filter((valueFromDropdown) => option.value !== valueFromDropdown.value)
			});
		}
	};

	// Handle empty state, this should show if a default or controlled value is empty
	if ((Array.isArray(value) && value.length === 0) || (!Array.isArray(value) && value === null)) {
		return (
			<div className='mr-2 w-full'>
				<span
					className={classNames(
						'ease flex w-max items-center rounded-full text-sm font-semibold transition duration-300 active:bg-gray-300',
						{
							'p-2': Array.isArray(value) && value.length === 0
						}
					)}
				>
					<p className='text-base text-gray-500'>{placeholder}</p>
				</span>
			</div>
		);
	}

	// When it's a single select Listbox just output the value provided e.g. "Popularly (A-Z)"
	if (!Array.isArray(value)) {
		return (
			<div className='w-full'>
				<p className='text-black'>{value?.label}</p>
			</div>
		);
	}

	// When it's a multi-select Listbox provide additional functionality via the Chips's
	if (Array.isArray(value)) {
		// Store the number of items currently available
		const valuesToDisplay = [...value];

		// This will store the number of options we aren't going to display, only ever set when the displayLimit is exceeded
		let numberOfItemsWereNotDisplay = 0;

		// If the current amount of values is more than the displayLimit then update the numberOfItemsWereNotDisplay (No need for an effect, this can be derived from the value)
		if (valuesToDisplay.length > displayLimit) {
			numberOfItemsWereNotDisplay = valuesToDisplay?.splice(displayLimit)?.length;
		}

		return (
			<div className='flex w-full flex-wrap items-center'>
				{valuesToDisplay.map((valueToDisplay) => (
					<div className='mr-2' key={valueToDisplay.value}>
						<span className='ease flex w-max items-center rounded-full bg-secondary p-2 text-sm font-semibold transition duration-300 active:bg-gray-300'>
							<p className='text-base text-white'>{valueToDisplay.label}</p>

							{/* NOTE: You can't have buttons inside of buttons that's now allowed, hence the reason it's a div with a role attached for accessability */}
							{showMultiDeleteButton === true && (
								<div
									role='button'
									tabIndex={0}
									className='mx-2 bg-transparent text-black'
									onClick={(event) => onDeleteItem(event, valueToDisplay)}
									onKeyDown={(event) => {
										// When the user clicks the enter button
										if (event.key === 'Enter') onDeleteItem(event, valueToDisplay);
									}}
									aria-label={`${valueToDisplay} deletion button`}
								>
									<Icon className='fa-sharp fa-solid fa-xmark' />
								</div>
							)}
						</span>
					</div>
				))}

				{/* Display the number of items that exceed the display limit e.g. +5 */}
				{numberOfItemsWereNotDisplay > 0 && <p>+{numberOfItemsWereNotDisplay}</p>}
			</div>
		);
	}

	return null;
};

export default ListboxDisplayValues;
