import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { alertVariants } from '~/components/Alert/Alert.variants';

/**
 * Properties for the Alert component.
 *
 * @example
 * ```tsx
 * <Alert variant="destructive">
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>Something went wrong.</AlertDescription>
 * </Alert>
 * ```
 */
export interface IAlert extends React.ComponentProps<'div'>, VariantProps<typeof alertVariants> {}

/** Properties for the AlertTitle sub-component. */
export interface IAlertTitle extends React.ComponentProps<'div'> {}

/** Properties for the AlertDescription sub-component. */
export interface IAlertDescription extends React.ComponentProps<'div'> {}
