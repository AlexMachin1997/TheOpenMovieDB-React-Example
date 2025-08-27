import { Command, CommandList, CommandInput, CommandEmpty } from '~/components/Command/Command';
import { PopoverContent } from '~/components/Popover/Popover';

interface ISelectList extends React.ComponentPropsWithoutRef<typeof Command> {
	search?: { placeholder?: string; emptyMessage?: string };
	children: React.ReactNode;
}

export const SelectList = ({ search, children, ...props }: ISelectList) => {
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
