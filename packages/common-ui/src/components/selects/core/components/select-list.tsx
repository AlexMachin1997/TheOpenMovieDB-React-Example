import { Command, CommandList, CommandInput, CommandEmpty } from '~/components/command/command';
import { PopoverContent } from '~/components/popover/popover';

export const SelectList = ({
	search,
	children,
	...props
}: {
	search?: { placeholder?: string; emptyMessage?: string };
	children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<typeof Command>, 'children'>) => {
	return (
		<PopoverContent className='min-w-[var(--radix-popover-trigger-width)] p-0'>
			<Command {...props} shouldFilter={false}>
				{typeof search !== 'undefined' && <CommandInput placeholder={search.placeholder} />}
				<CommandList>
					<CommandEmpty>{search?.emptyMessage ?? 'No items found'}</CommandEmpty>
					{children}
				</CommandList>
			</Command>
		</PopoverContent>
	);
};
