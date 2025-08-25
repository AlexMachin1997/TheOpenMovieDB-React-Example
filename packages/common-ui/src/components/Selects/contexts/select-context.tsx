import { createContext } from 'react';
import { SelectContext as SelectContextType } from '~/components/Selects/types/select-context';

export const SelectContext = createContext<SelectContextType | null>(null);
