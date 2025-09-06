# Command Component Types

This directory contains the type definitions for the Command component and shared base types that are used by both Command and Selects components.

## File Structure

The types are organized into three logical files for better maintainability and discoverability:

- `core.ts` - Core command interfaces including context, provider, and common props
- `virtualization.ts` - All virtualization-related types and interfaces
- `grouping.ts` - All grouping-related types and interfaces
- `index.ts` - Exports all types from this directory

## Type Organization

### Core Types (`core.ts`)

Contains the fundamental interfaces that define command-like functionality:

#### Common Props

- `ICommonCommandProps` - Basic properties shared across command components
- `IVirtualizationProps` - Virtualization configuration properties
- `IRenderProps` - Render function patterns for components
- `IRenderWithIndex` - Render functions with index information

#### Context & Provider

- `ICommandContext` - Command context interface with state and functions
- `ICommandProvider` - Provider configuration for command components
- `ICommandSearchConfig` - Search functionality configuration
- `IEmptyStateConfig` - Empty state message customization

### Virtualization Types (`virtualization.ts`)

Contains all types related to virtualized rendering:

- `VirtualizedItem` - Union type representing different item types in virtualized lists
- `ICommandGroupedVirtualizedList` - Props for grouped virtualized lists
- `ICommandGroupedList` - Props for grouped lists (non-virtualized)
- `ICommandVirtualizedList` - Props for virtualized lists with index support

### Grouping Types (`grouping.ts`)

Contains all types related to grouping functionality:

- `IGrouping` - Configuration for grouping behavior
- `IGroupedOptions` - Result structure from grouping operations
- `IGroupOptionsParams` - Parameters required for grouping operations

## Key Features

- **Logical Organization**: Related types are grouped together for better discoverability
- **Consistent Naming**: All interfaces follow the `I` prefix convention
- **Well Documented**: Each interface includes comprehensive JSDoc comments
- **Type Safe**: Full TypeScript support with proper inheritance and constraints
- **Maintainable**: Consolidated structure reduces file count and improves maintainability

## Usage in Command Component

The Command component uses these types as follows:

```typescript
// Import from the main types index
import {
	ICommandContext,
	ICommandProvider,
	ICommandGroupedVirtualizedList
} from '~/components/Command/types';

// Use in components
export const CommandProvider = ({ children, options, ...props }: ICommandProvider) => {
	// Component implementation
};
```

## Usage in Selects Component

The Selects component extends these base types with select-specific functionality:

```typescript
// Import base types and extend them
import { ICommandProvider } from '~/components/Command/types';

export interface ISelectProviderProps extends ICommandProvider {
	mode: 'single' | 'multiple';
	initialSelectedValues?: string[];
	onSelectionChange?: (selectedValues: string[]) => void;
}
```

## Benefits of the New Structure

1. **Better Organization**: Related types are logically grouped together
2. **Reduced Complexity**: From 9 files down to 3 main files
3. **Easier Navigation**: Developers can quickly find related types
4. **Improved Maintainability**: Changes to related types happen in one place
5. **Cleaner Imports**: Single import path for related functionality
6. **Better Discoverability**: Clear separation of concerns between different type categories

## Future Extensions

When adding new types, consider:

1. **Placement**: Add types to the most logical file based on their purpose
2. **Naming**: Follow the established `I` prefix convention
3. **Documentation**: Include comprehensive JSDoc comments
4. **Consistency**: Maintain the same patterns and structure
5. **Reusability**: Design types to be reusable across components when possible

## Migration Notes

This structure consolidates the previous scattered type files into a more logical organization. All existing imports continue to work through the `index.ts` file, but you can now also import directly from specific type files if needed:

```typescript
// Both approaches work:
import { ICommandContext } from '~/components/Command/types'; // Via index
import { ICommandContext } from '~/components/Command/types/core'; // Direct import
```
