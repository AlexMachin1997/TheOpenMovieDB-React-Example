import { Slot } from '@radix-ui/react-slot';

import { cn } from '@repo/tailwind-config';
import { badgeVariants } from '~/components/Badge/Badge.variants';
import type { IBadge } from '~/components/Badge/Badge.types';

const Badge = ({ className, variant, asChild = false, ...props }: IBadge) => {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp data-slot='badge' className={cn(badgeVariants({ variant }), className)} {...props} />
	);
};

Badge.displayName = 'Badge';

export { Badge };
