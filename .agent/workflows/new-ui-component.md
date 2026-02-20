---
description: How to scaffold a new UI component adhering to our file-based architecture.
---

# Create a New UI Component

When creating a new component (e.g., `Slider`) within a UI package, adhere exactly to our File Separation Engineering Standards.

1. **Create the Folder Structure**

   ```bash
   mkdir -p src/components/Slider
   ```

2. **Create the Types (`src/components/Slider/Slider.types.ts`)**
   Prefix interfaces with `I` and add JSDocs for the properties.

   ```typescript
   export interface ISlider extends React.ComponentProps<'div'> {
   	/** The starting value of the slider */
   	defaultValue?: number[];
   }
   ```

3. **Create the Component (`src/components/Slider/Slider.tsx`)**
   Import `cn` exclusively from the centralized config, never from sibling UI packages, and definitely never from the package's own public name.

   ```tsx
   import { cn } from '@repo/tailwind-config';
   import type { ISlider } from '~/components/Slider/Slider.types';

   export const Slider = ({ className, ...props }: ISlider) => {
   	return <div className={cn('base-styles', className)} {...props} />;
   };
   ```

4. **Create the Storybook (`src/components/Slider/Slider.stories.tsx`)**
   Enable autodocs.

   ```tsx
   import type { Meta, StoryObj } from '@storybook/react-vite';
   import { Slider } from '~/components/Slider/Slider';

   const meta: Meta<typeof Slider> = {
   	title: 'Components/Slider',
   	component: Slider,
   	tags: ['autodocs']
   };
   export default meta;

   type Story = StoryObj<typeof Slider>;

   export const Default: Story = {
   	args: { defaultValue: [50] }
   };
   ```

5. **Export from Barrel (`src/components/Slider/index.ts`)**

   ```typescript
   export * from '~/components/Slider/Slider';
   export * from '~/components/Slider/Slider.types';
   ```

6. **Add to Package Exports (`src/index.ts`)**
   Update the main `src/index.ts` to export your component.
   ```typescript
   export * from '~/components/Slider';
   ```
