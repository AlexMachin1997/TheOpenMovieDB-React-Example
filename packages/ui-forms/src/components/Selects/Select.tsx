import * as React from 'react';

import { SelectProvider } from '~/components/Selects/components/SelectProvider';
import { SelectTrigger } from '~/components/Selects/components/SelectTrigger';
import { SelectInterface } from '~/components/Selects/components/SelectInterface';
import { SelectListItems } from '~/components/Selects/components/SelectListItems';
import { SelectListItem } from '~/components/Selects/components/SelectListItem';
import { SingleSelectValue } from '~/components/Selects/SingleSelect/SingleSelect';
import { MultiSelectValue } from '~/components/Selects/MultiSelect/MultiSelect';
import type { SelectProps } from '~/components/Selects/Select.types';

/**
 * A unified Select component supporting both single and multi-select modes.
 *
 * The `type` prop acts as a discriminator — TypeScript will enforce the correct
 * `value` / `onValueChange` signatures automatically.
 *
 * @example
 * ```tsx
 * // Single select
 * const [value, setValue] = useState('');
 * <Select type="single" value={value} onValueChange={setValue} options={options} />
 *
 * // Multi select
 * const [values, setValues] = useState<string[]>([]);
 * <Select type="multiple" value={values} onValueChange={setValues} options={options} />
 * ```
 */
export const Select = (props: SelectProps) => {
	const {
		options,
		placeholder,
		showClearButton = true,
		searchConfig,
		emptyState,
		defaultSearchValue,
		triggerClassName,
		children,
		id,
		required,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
		'aria-describedby': ariaDescribedBy,
		'aria-invalid': ariaInvalid,
		'aria-required': ariaRequired
	} = props;

	// Normalise `values` to an array for SelectProvider
	const providerValues = React.useMemo(() => {
		if (props.type === 'single') {
			return props.value ? [props.value] : [];
		}
		return props.value;
	}, [props.type, props.value]);

	// Wrap onValuesChange so it matches the SelectProvider callback while
	// returning the correctly-typed value to the consumer.
	const handleValuesChange = React.useCallback(
		(next: string | string[]) => {
			if (props.type === 'single') {
				props.onValueChange(next as string);
			} else {
				props.onValueChange(next as string[]);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props.type, props.onValueChange]
	);

	const defaultChildren = (
		<SelectListItems>{({ item }) => <SelectListItem value={item.value} />}</SelectListItems>
	);

	return (
		<SelectProvider
			mode={props.type === 'single' ? 'single' : 'multiple'}
			values={providerValues}
			onValuesChange={handleValuesChange}
			options={options}
			emptyState={emptyState}
			defaultSearchValue={defaultSearchValue}
		>
			<SelectTrigger
				className={triggerClassName ?? 'w-full'}
				// The trigger is a <button>, which is a labelable element — so a Field's native
				// <label htmlFor={id}> names it without needing aria-labelledby.
				id={id}
				aria-label={ariaLabel}
				aria-labelledby={ariaLabelledBy}
				aria-describedby={ariaDescribedBy}
				aria-invalid={ariaInvalid}
				aria-required={ariaRequired ?? required}
			>
				{props.type === 'single' ? (
					<SingleSelectValue
						placeholder={placeholder ?? 'Select an option...'}
						showClearButton={showClearButton}
					/>
				) : (
					<MultiSelectValue
						placeholder={placeholder ?? 'Select options...'}
						showClearButton={showClearButton}
						overflowBehavior={props.overflowBehavior}
					/>
				)}
			</SelectTrigger>

			<SelectInterface searchConfig={searchConfig} emptyState={emptyState}>
				{children ?? defaultChildren}
			</SelectInterface>
		</SelectProvider>
	);
};
