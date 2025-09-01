# Selects Component Types

This directory contains the type definitions for the Selects component, which provides select-specific functionality.

## File Structure

- `select-value-types.ts` - Types for select value display components
- `select-context.ts` - Select-specific context types
- `index.ts` - Exports all types from this directory

## Select Value Types

The `select-value-types.ts` file contains types for select value display components:

### Core Interfaces

- `ISingleSelectValue` - Props for single-select value display components
- `IMultiSelectValue` - Props for multi-select value display components

### Key Features

- **Value Display**: Types for components that display selected values
- **Mode Support**: Supports both single and multiple selection modes
- **Well Documented**: Each interface includes comprehensive JSDoc comments
- **Type Safe**: Full TypeScript support

## Select Context Types

The `select-context.ts` file contains types for select context functionality:

### Core Interfaces

- `ISelectContext` - Select-specific context value interface
- `IBaseSelectProviderProps` - Provider props interface for select components

### Key Features

- **Selection State**: Manages selected values and toggle functionality
- **Mode Configuration**: Supports single and multiple selection modes
- **Provider Props**: Configuration for select providers

## Usage in Selects Component

The Selects component uses these types as follows:

```typescript
// Select context provides selection functionality
export type ISelectContext = {
	selectedValues: Set<string>;
	toggleValue: (value: string) => void;
	mode: 'single' | 'multiple';
};

// Components use the value display types
export const SingleSelectValue = (props: ISingleSelectValue) => {
	// Component implementation
};

export const MultiSelectValue = (props: IMultiSelectValue) => {
	// Component implementation
};
```

## Type Structure

```
ISelectContext (select context)
├── selectedValues: Set<string>
├── toggleValue: (value: string) => void
└── mode: 'single' | 'multiple'

ISingleSelectValue (single select display)
├── showClearButton?: boolean
├── placeholder?: string
└── ...React.ComponentPropsWithoutRef<'ul'>

IMultiSelectValue (multi select display)
├── showClearButton?: boolean
├── placeholder?: string
├── overflowBehavior?: 'wrap' | 'wrap-when-open' | 'cutoff'
└── ...React.ComponentPropsWithoutRef<'ul'>
```

## Benefits

1. **Specialization**: Focused on select-specific functionality
2. **Type Safety**: Full TypeScript support with proper typing
3. **Maintainability**: Clear separation of concerns
4. **Documentation**: Comprehensive JSDoc comments
5. **Flexibility**: Supports both single and multiple selection modes

## Component Integration

The Selects components use these types:

- `SingleSelectValue` uses `ISingleSelectValue`
- `MultiSelectValue` uses `IMultiSelectValue`

This ensures consistent prop interfaces and proper type safety across the select components.
