import { ListboxDisplayValueProps, SelectOption } from '../../../types/DropdownElementTypes';
import Icon from '../Icon/Icon';

const ListboxDisplayValues = ({
	value = null,
	onChange = null,
	displayLimit = 3,
	showMultiDeleteButton = false
}: ListboxDisplayValueProps) => {
	const onDeleteItem = (event: React.KeyboardEvent | React.MouseEvent, option: SelectOption) => {
		if (typeof onChange === 'function' && Array.isArray(value)) {
			// Prevent event from bubbling up to the Button's onClick which actually opens the dropdown menu which we don't want.
			event.stopPropagation();

			// Since the delete button has been clicked make sure to pass back every item expect for the one we clicked
			onChange({ value: value.filter((el2) => option.value !== el2.value) });
		}
	};

	// When it's a single select Listbox just output the value provided e.g. "Popularly (A-Z)"
	if (!Array.isArray(value)) {
		return <p className='text-black'>{value?.label}</p>;
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
			<div className='flex flex-wrap items-center'>
				{valuesToDisplay.map((el) => (
					<div className='mr-2 py-1' key={el.value}>
						<span className='ease flex w-max items-center rounded-full bg-secondary p-2 text-sm font-semibold transition duration-300 active:bg-gray-300'>
							<p className='text-base text-white'>{el.label}</p>

							{/* NOTE: You can't have buttons inside of buttons that's now allowed, hence the reason it's a div with a role attached for accessability */}
							{showMultiDeleteButton === true && (
								<div
									role='button'
									tabIndex={0}
									className='mx-2 bg-transparent text-black'
									onClick={(event) => onDeleteItem(event, el)}
									onKeyDown={(event) => {
										// When the user clicks the enter button
										if (event.key === 'Enter') onDeleteItem(event, el);
									}}
									aria-label={`${el} deletion button`}
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
