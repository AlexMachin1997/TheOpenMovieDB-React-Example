import * as React from 'react';
import { usePopper } from 'react-popper';

const useDropdownPlacement = () => {
	const [referenceElement, setReferenceElement] = React.useState<HTMLElement>();
	const [popperElement, setPopperElement] = React.useState<HTMLDivElement>();
	const containerRef = React.useRef<HTMLDivElement | null>(null);

	// Used to calculate the offset for the usePopper hook which provides the menu placement functionality, used to switch between top or bottom for the menu
	const offset = React.useCallback(() => {
		// Get the height of the dropdown container (Used to determine how much distance should be applied to the offset)
		const dropdownContainerHeight = containerRef?.current?.getBoundingClientRect()?.height ?? 0;

		// Skidding reference: https://popper.js.org/docs/v2/modifiers/offset/#skidding-1
		const skidding = 0;

		// Distance reference: https://popper.js.org/docs/v2/modifiers/offset/#distance-1
		// When using multiple make sure to use slightly increased distance to account for the custom output otherwise default to 25 distance
		const distance = dropdownContainerHeight / 2;

		// When the placement is anything else ie top set the distance to 25
		// NOTE: Force typescript to read these as numbers, when you use a static value is reads it as the literal value which is undesired
		return [skidding, distance] as [number, number];
	}, []);

	// Used to place the menu either on the top or bottom of the Listbox button
	const popper = usePopper(referenceElement, popperElement, {
		modifiers: [
			{
				name: 'flip',
				options: {
					// Switch between top and bottom for the position of the element
					fallbackPlacements: ['top', 'bottom']
				}
			},
			{
				name: 'offset',
				options: {
					// Calculate the offset for the popper, comes down to current placement and if the dropdown is multi-select or not
					offset
				}
			},
			{
				name: 'computeStyles',
				options: {
					// By setting gpuAcceleration to false Popper will use top/left properties with the position: absolute and not transform translate3d
					gpuAcceleration: false // true by default
				}
			}
		]
	});

	return {
		referenceElement,
		setReferenceElement,
		popperElement,
		setPopperElement,
		popper,
		containerRef
	};
};

export default useDropdownPlacement;
