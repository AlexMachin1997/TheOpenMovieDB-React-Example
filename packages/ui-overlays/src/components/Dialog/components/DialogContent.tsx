import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@repo/tailwind-config';
import { DialogOverlay } from '~/components/Dialog/components/DialogOverlay';
import { DialogPortal } from '~/components/Dialog/components/DialogPortal';
import { XIcon } from 'lucide-react';
import type { IDialogContent } from '~/components/Dialog/Dialog.types';

export const DialogContent = ({
	className,
	children,
	showCloseButton = true,
	icon,
	...props
}: IDialogContent) => {
	return (
		<DialogPortal data-slot='dialog-portal'>
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot='dialog-content'
				className={cn(
					'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg border shadow-lg duration-200 sm:max-w-lg',
					'max-h-[90vh] flex flex-col',
					className
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot='dialog-close'
						className="cursor-pointer ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6"
					>
						{icon ?? <XIcon />}
						<span className='sr-only'>Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
};
