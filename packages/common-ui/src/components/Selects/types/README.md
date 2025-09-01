# Selects Component Types

This directory contains the type definitions for the Selects component, which extends the shared base command types with select-specific functionality.

## File Structure

- `base-select-types.ts` - Select-specific types that extend base command types
- `select-context.ts` - Select-specific context types that extend base context
- `index.ts` - Exports all types from this directory

## Base Select Types

The `base-select-types.ts` file contains types that extend the shared base command types with select-specific functionality:

### Core Interfaces

- `BaseSelectContextValue` - Extends `BaseCommandContextValue` with selection state
- `BaseSelectProviderProps` - Extends `BaseCommandProviderProps` with selection configuration
- `BaseSelectValueProps` - Base props for select value display components
- `SingleSelectValueProps` - Props for single-select value display components
- `MultiSelectValueProps` - Props for multi-select value display components

### Key Features

- **Extends Base Types**: All select types extend the shared base command types
- **Selection-Specific**: Adds selection state management and mode handling
- **Mode Support**: Supports both single and multiple selection modes
- **Well Documented**: Each interface includes comprehensive JSDoc comments
- **Type Safe**: Full TypeScript support with proper inheritance

## Usage in Selects Component

The Selects component uses these types as follows:

```typescript
// Select context extends base select context
export type SelectContext = BaseSelectContextValue & {
	// Select-specific properties can be added here
};

// Components use the shared types
export const SingleSelectValue = (props: SingleSelectValueProps) => {
	// Component implementation
};

export const MultiSelectValue = (props: MultiSelectValueProps) => {
	// Component implementation
};
```

## Type Hierarchy

```
BaseCommandContextValue (shared)
├── BaseSelectContextValue (selects)
│   └── SelectContext (selects)
└── CommandContextValue (command)

BaseCommandProviderProps (shared)
├── BaseSelectProviderProps (selects)
└── ICommandProviderProps (command)
```

## Benefits

1. **Inheritance**: Leverages shared base types for consistency
2. **Specialization**: Adds select-specific functionality on top of base types
3. **Maintainability**: Changes to base types automatically benefit selects
4. **Type Safety**: Full TypeScript support with proper inheritance
5. **Documentation**: Clear separation between shared and select-specific concerns

## Component Integration

The Selects components now use these shared types:

- `SingleSelectValue` uses `SingleSelectValueProps`
- `MultiSelectValue` uses `MultiSelectValueProps`

This ensures consistent prop interfaces and eliminates duplicate type definitions.
