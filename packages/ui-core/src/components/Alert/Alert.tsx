import { cn } from '@repo/tailwind-config';
import { alertVariants } from '~/components/Alert/Alert.variants';
import { IAlert, IAlertDescription, IAlertTitle } from '~/components/Alert/Alert.types';

const Alert = ({ className, variant, ...props }: IAlert) => {
	return (
		<div
			data-slot='alert'
			role='alert'
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
};

const AlertTitle = ({ className, ...props }: IAlertTitle) => {
	return (
		<div
			data-slot='alert-title'
			className={cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className)}
			{...props}
		/>
	);
};

const AlertDescription = ({ className, ...props }: IAlertDescription) => {
	return (
		<div
			data-slot='alert-description'
			className={cn(
				'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
				className
			)}
			{...props}
		/>
	);
};

export { Alert, AlertTitle, AlertDescription };
