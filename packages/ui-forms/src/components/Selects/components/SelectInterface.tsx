import { CommandInterface, ICommandSearchConfig, IEmptyStateConfig } from '@repo/ui-command';
import { PopoverContent } from '@repo/ui-overlays';

interface ISelectInterface extends React.ComponentPropsWithoutRef<typeof CommandInterface> {
	children: React.ReactNode;
	emptyState?: IEmptyStateConfig;
	searchConfig?: ICommandSearchConfig;
}

export const SelectInterface = ({ children, ...props }: ISelectInterface) => {
	return (
		<PopoverContent className='min-w-[var(--radix-popover-trigger-width)] p-0'>
			<CommandInterface {...props}>{children}</CommandInterface>
		</PopoverContent>
	);
};
