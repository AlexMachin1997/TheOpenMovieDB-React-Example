import { DayPicker, DayPickerProps, getDefaultClassNames } from 'react-day-picker';
import { cn } from '@repo/tailwind-config';
import { Icon } from '~/components/Icon/Icon';
import type { IconName } from '~/components/Icon/Icon.constants';
import { Button } from '~/components/Button/Button';
import { buttonVariants } from '~/components/Button/Button.variants';
import { CalendarDayButton } from '~/components/Calendar/components/CalendarDayButton';

// A type alias rather than an interface: `DayPickerProps` is a discriminated union on `mode`
// ('single' | 'multiple' | 'range'), and an interface cannot extend a union.
type ICalendar = {
	buttonVariant?: React.ComponentProps<typeof Button>['variant'];
} & DayPickerProps;

export const Calendar = ({
	className,
	classNames,
	showOutsideDays = true,
	captionLayout = 'label',
	buttonVariant = 'ghost',
	formatters,
	components,
	...props
}: ICalendar) => {
	const defaultClassNames = getDefaultClassNames();

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn(
				'bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
				String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
				String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
				className
			)}
			captionLayout={captionLayout}
			formatters={{
				formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
				...formatters
			}}
			classNames={{
				root: cn('w-fit', defaultClassNames.root),
				months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
				month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
				nav: cn(
					'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
					defaultClassNames.nav
				),
				button_previous: cn(
					buttonVariants({ variant: buttonVariant }),
					'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
					defaultClassNames.button_previous
				),
				button_next: cn(
					buttonVariants({ variant: buttonVariant }),
					'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
					defaultClassNames.button_next
				),
				month_caption: cn(
					'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
					defaultClassNames.month_caption
				),
				dropdowns: cn(
					'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
					defaultClassNames.dropdowns
				),
				dropdown_root: cn(
					'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
					defaultClassNames.dropdown_root
				),
				dropdown: cn('absolute bg-popover inset-0 opacity-0', defaultClassNames.dropdown),
				caption_label: cn(
					'select-none font-medium',
					captionLayout === 'label'
						? 'text-sm'
						: 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
					defaultClassNames.caption_label
				),
				table: 'w-full border-collapse',
				weekdays: cn('flex', defaultClassNames.weekdays),
				weekday: cn(
					'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none',
					defaultClassNames.weekday
				),
				week: cn('flex w-full mt-2', defaultClassNames.week),
				week_number_header: cn('select-none w-(--cell-size)', defaultClassNames.week_number_header),
				week_number: cn(
					'text-[0.8rem] select-none text-muted-foreground',
					defaultClassNames.week_number
				),
				day: cn(
					'relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none',
					defaultClassNames.day
				),
				range_start: cn('rounded-l-md bg-accent', defaultClassNames.range_start),
				range_middle: cn('rounded-none', defaultClassNames.range_middle),
				range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
				today: cn(
					'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
					defaultClassNames.today
				),
				outside: cn(
					'text-muted-foreground aria-selected:text-muted-foreground',
					defaultClassNames.outside
				),
				disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
				hidden: cn('invisible', defaultClassNames.hidden),
				...classNames
			}}
			components={{
				Root: ({ className, rootRef, ...props }) => {
					return <div data-slot='calendar' ref={rootRef} className={cn(className)} {...props} />;
				},
				Chevron: ({ className, orientation }) => {
					// react-day-picker also passes `size` and `disabled` here. Neither is forwarded:
					// `size` only ever arrives from the caption dropdown, where `[&>svg]:size-3.5`
					// above already wins, and nothing styles a `disabled` svg.
					let name: IconName = 'chevron-down';

					if (orientation === 'left') {
						name = 'chevron-left';
					}

					if (orientation === 'right') {
						name = 'chevron-right';
					}

					return <Icon name={name} className={className} data-orientation={orientation} />;
				},
				DayButton: CalendarDayButton,
				WeekNumber: ({ children, ...props }) => {
					return (
						<td {...props}>
							<div className='flex size-(--cell-size) items-center justify-center text-center'>
								{children}
							</div>
						</td>
					);
				},
				...components
			}}
			{...props}
		/>
	);
};
