import * as React from 'react';
import { CommandProvider } from '@repo/ui-command';
import { SelectContext } from '~/components/Selects/contexts/select-context';
import type { Option } from '@repo/core';
import { IEmptyStateConfig } from '@repo/ui-command';

interface ISelectProviderCommonOptions {
	/** Available options for selection */
	options: Option[];
	/** Whether to close the dropdown when an option is selected */
	closeOnSelect?: boolean;
	/** Child components to render */
	children: React.ReactNode;
	/** Currently selected value(s) */
	values?: string[];
	/** Configuration for empty state messages */
	emptyState?: IEmptyStateConfig;
	/** Default search value to start with */
	defaultSearchValue?: string;
}

/**
 * Props for single-select mode
 */
interface SingleSelectProviderProps extends ISelectProviderCommonOptions {
	mode: 'single';
	onValuesChange: (values: string) => void;
}

/**
 * Props for multi-select mode
 */
interface MultiSelectProviderProps extends ISelectProviderCommonOptions {
	mode: 'multiple';
	onValuesChange: (values: string[]) => void;
}

type SelectProviderProps = SingleSelectProviderProps | MultiSelectProviderProps;

const SelectProviderInner = (props: SelectProviderProps) => {
	const toggleValue = (value: string) => {
		const currentValues = new Set(props?.values ?? []);

		if (props.mode === 'single') {
			if (currentValues.has(value)) {
				props.onValuesChange('');
			} else {
				props.onValuesChange(value);
			}
		}

		if (props.mode === 'multiple') {
			if (currentValues.has(value)) {
				currentValues.delete(value);
			} else {
				currentValues.add(value);
			}

			props.onValuesChange(Array.from(currentValues));
		}
	};

	return (
		<SelectContext.Provider
			value={{
				selectedValues: new Set(props.values || []),
				toggleValue,
				mode: props.mode
			}}
		>
			{props.children}
		</SelectContext.Provider>
	);
};

export const SelectProvider = (props: SelectProviderProps) => {
	const [open, setOpen] = React.useState(false);

	return (
		<CommandProvider
			open={open}
			setOpen={setOpen}
			closeOnSelect={props.mode === 'single'}
			options={props.options}
			emptyState={props.emptyState}
			defaultSearchValue={props.defaultSearchValue}
		>
			<SelectProviderInner {...props} />
		</CommandProvider>
	);
};
