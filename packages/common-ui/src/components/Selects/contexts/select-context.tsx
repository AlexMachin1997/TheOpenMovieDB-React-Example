import { createContext } from 'react';
import { SelectContext as SelectContextInterface } from '~/components/Selects/types/select-context';

/**
 * React context for select functionality
 *
 * This context provides access to select state and functions throughout
 * the component tree. It must be used within a SelectProvider.
 *
 * The context includes:
 * - Selected values and toggle functionality
 * - Options mapping and filtering
 * - Search functionality
 * - Selection mode configuration
 *
 * @example
 * ```tsx
 * const { selectedValues, toggleValue, mode } = useSelectContext();
 * ```
 */
export const SelectContext = createContext<SelectContextInterface | null>(null);

/**
 * Select context type (no longer generic since values are always strings)
 */
export type SelectContextType = SelectContextInterface;

// Re-export the interface for use in other files
export type { SelectContextInterface };
