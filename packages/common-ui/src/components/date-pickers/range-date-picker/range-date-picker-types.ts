import type { DateRange } from 'react-day-picker';

import type { DatePickerProps } from '~/components/date-pickers/types';

export interface DateRangePickerProps extends DatePickerProps {
	dateRange?: DateRange;
	onDateRangeChange?: (dateRange: DateRange | undefined) => void;
}
