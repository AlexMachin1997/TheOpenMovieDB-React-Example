import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

/**
 * Properties for the Switch toggle component.
 *
 * @example
 * ```tsx
 * <Switch checked={isOn} onCheckedChange={setIsOn} />
 * ```
 */
export interface ISwitch extends React.ComponentProps<typeof SwitchPrimitive.Root> {
	className?: string;
}
