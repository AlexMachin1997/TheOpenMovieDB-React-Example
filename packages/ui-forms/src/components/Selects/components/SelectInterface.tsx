import { CommandInterface, ICommandSearchConfig, IEmptyStateConfig } from '@repo/ui-command';
import { PopoverContent } from '@repo/ui-overlays';

interface ISelectInterface extends React.ComponentPropsWithoutRef<typeof CommandInterface> {
	children: React.ReactNode;
	emptyState?: IEmptyStateConfig;
	searchConfig?: ICommandSearchConfig;
}

export const SelectInterface = ({ children, ...props }: ISelectInterface) => {
	return (
		// At least as wide as the trigger. `anchor-size()` reads the popover's anchor, which is the
		// trigger, so the browser keeps the two in step with no measuring.
		<PopoverContent className='min-w-[anchor-size(width)] p-0'>
			<CommandInterface {...props}>{children}</CommandInterface>
		</PopoverContent>
	);
};
