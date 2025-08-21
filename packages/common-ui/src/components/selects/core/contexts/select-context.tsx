import { createContext } from 'react';
import { SelectContext as SelectContextType } from '~/components/selects/core/types/select-context';

export const SelectContext = createContext<SelectContextType | null>(null);
