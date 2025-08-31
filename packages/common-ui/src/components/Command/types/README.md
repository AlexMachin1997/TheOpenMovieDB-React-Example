# Command Component Types

This directory contains the type definitions for the Command component and shared base types that are used by both Command and Selects components.

## File Structure

- `base-command-types.ts` - Shared base types used by both Command and Selects components
- `command-provider.ts` - Command-specific provider types that extend base types
- `index.ts` - Exports all types from this directory

## Shared Base Types

The `base-command-types.ts` file contains pure, generic types that form the foundation for command-like functionality:

### Core Interfaces

- `BaseCommandContextValue` - Base context value for command-like functionality
- `BaseCommandProviderProps` - Base provider props for command-like components
- `GroupedOptionsConfig` - Configuration for grouping behavior
- `GroupedOptionsResult` - Result of grouping operations
- `BaseCommandProps` - Base props for command-like components
- `BaseCommandItemProps` - Base props for command item components

### Key Features

- **Pure and Generic**: These types contain no select-specific references
- **Reusable**: Can be extended by any component that needs command-like functionality
- **Well Documented**: Each interface includes comprehensive JSDoc comments
- **Type Safe**: Full TypeScript support with proper generic constraints

## Usage in Command Component

The Command component uses these base types as follows:

```typescript
// Command-specific context extends base context
export interface CommandContextValue extends BaseCommandContextValue {
	// Command-specific properties can be added here
}

// Command-specific provider props extend base props
export interface ICommandProviderProps extends BaseCommandProviderProps {
	// Command-specific props can be added here
}
```

## Usage in Selects Component

The Selects component extends these base types with select-specific functionality:

```typescript
// Select-specific context extends base context
export interface BaseSelectContextValue extends BaseCommandContextValue {
	selectedValues: Set<string>;
	toggleValue: (value: string) => void;
	mode: 'single' | 'multiple';
}

// Select-specific provider props extend base props
export interface BaseSelectProviderProps extends BaseCommandProviderProps {
	mode: 'single' | 'multiple';
	initialSelectedValues?: string[];
	onSelectionChange?: (selectedValues: string[]) => void;
}
```

## Benefits

1. **Code Reuse**: Eliminates duplicate type definitions between Command and Selects
2. **Consistency**: Ensures both components follow the same patterns
3. **Maintainability**: Changes to base types automatically propagate to both components
4. **Extensibility**: Easy to add new command-like components that reuse these types
5. **Type Safety**: Full TypeScript support with proper inheritance and constraints

## Future Extensions

When adding new command-like components, consider:

1. Extending the base types rather than creating new ones
2. Adding component-specific properties to the extended interfaces
3. Maintaining the pure nature of base types (no component-specific references)
4. Following the established naming conventions and documentation patterns
