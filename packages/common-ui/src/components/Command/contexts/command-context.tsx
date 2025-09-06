import { ICommandContext } from '~/components/Command/types/core';
import { createContext } from 'react';

/**
 * React context for command functionality
 *
 * This context provides access to command state and functions
 * throughout the component tree.
 *
 * @extends ICommandContext
 */
export const CommandContext = createContext<ICommandContext | undefined>(undefined);

/**
 * Type alias for the command context value
 */
export type CommandContextValue = ICommandContext;
