import { createContext } from 'react';
import { IBaseCommandContext } from '../types';

/**
 * Context value interface for command palette functionality
 *
 * This interface extends the base command context value with any
 * Command-specific functionality. Currently, it's identical to the
 * base interface but can be extended with Command-specific properties
 * in the future.
 *
 * @interface CommandContextValue
 * @extends IBaseCommandContext
 */
export type CommandContextValue = IBaseCommandContext;

/**
 * React context for command palette functionality
 *
 * This context provides access to command palette state and functions
 * throughout the component tree. It must be used within a CommandProvider.
 *
 * The context includes:
 * - Open/close state management
 * - Search functionality
 * - Item management
 * - Selection behavior configuration
 *
 * @example
 * ```tsx
 * const { open, close, searchValue } = useCommandContext();
 * ```
 */
export const CommandContext = createContext<CommandContextValue | null>(null);
