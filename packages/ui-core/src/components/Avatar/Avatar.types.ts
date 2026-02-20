import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

/** Properties for the Avatar root component. */
export interface IAvatar extends React.ComponentProps<typeof AvatarPrimitive.Root> {}

/** Properties for the AvatarImage sub-component. */
export interface IAvatarImage extends React.ComponentProps<typeof AvatarPrimitive.Image> {}

/** Properties for the AvatarFallback sub-component. */
export interface IAvatarFallback extends React.ComponentProps<typeof AvatarPrimitive.Fallback> {}
