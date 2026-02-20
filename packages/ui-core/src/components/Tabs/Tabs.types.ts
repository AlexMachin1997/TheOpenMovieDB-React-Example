import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

/** Properties for the Tabs root component. */
export interface ITabs extends React.ComponentProps<typeof TabsPrimitive.Root> {}

/** Properties for the TabsList sub-component. */
export interface ITabsList extends React.ComponentProps<typeof TabsPrimitive.List> {}

/** Properties for the TabsTrigger sub-component. */
export interface ITabsTrigger extends React.ComponentProps<typeof TabsPrimitive.Trigger> {}

/** Properties for the TabsContent sub-component. */
export interface ITabsContent extends React.ComponentProps<typeof TabsPrimitive.Content> {}
