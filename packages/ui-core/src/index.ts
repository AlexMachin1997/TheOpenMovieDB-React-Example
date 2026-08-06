// Components
export {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent
} from '~/components/Accordion/Accordion';
export { Alert, AlertTitle, AlertDescription } from '~/components/Alert/Alert';
export { Avatar, AvatarImage, AvatarFallback } from '~/components/Avatar/Avatar';
export { Badge } from '~/components/Badge/Badge';
export { Button } from '~/components/Button/Button';
export { Icon } from '~/components/Icon/Icon';
export { Label } from '~/components/Label/Label';
export { Progress } from '~/components/Progress/Progress';
export { Skeleton } from '~/components/Skeleton/Skeleton';
export { Switch } from '~/components/Switch/Switch';
export { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/Tabs/Tabs';
export {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider
} from '~/components/Tooltip/Tooltip';
export { Search } from '~/components/Search/Search';
export { DebouncableInput } from '~/components/DebouncableInput/DebouncableInput';

// `Field` composes a label, a control, a description and an error, and wires them together for
// assistive technology. It has no form-library dependency — `@repo/ui-forms`' `FormField` is the
// TanStack layer on top. `FieldMessage`, which it renders internally, is deliberately NOT exported;
// see docs/05-ui-forms-field-pattern/spec.md.
export { Field } from '~/components/Field/Field';
export type { IField, IFieldControlProps } from '~/components/Field/Field.types';

// Form primitives. These live here rather than in `@repo/ui-forms` because the package boundary is
// drawn by dependency footprint, not by category — nothing below needs `ui-overlays` or
// `ui-command`. See docs/04-ui-forms-primitive-migration/spec.md, Decisions.
export { Input } from '~/components/Input/Input';
export { Textarea } from '~/components/Textarea/Textarea';
export { Checkbox, CheckboxLabel } from '~/components/Checkbox/Checkbox';
export { CheckboxGroup } from '~/components/CheckboxGroup/CheckboxGroup';
export { Radio, RadioLabel } from '~/components/Radio/Radio';
export { RadioGroup } from '~/components/RadioGroup/RadioGroup';
export { SliderRange, SliderThumb, SliderTrack, SliderRoot } from '~/components/Slider/Slider';
export { Calendar, CalendarDayButton } from '~/components/Calendar/Calendar';

export type { ILabel, ILabelNative, ILabelNonNative } from '~/components/Label/Label.types';
export type { IInput } from '~/components/Input/Input.types';
export type { ITextarea } from '~/components/Textarea/Textarea.types';
export type { ICheckbox, ICheckboxLabel } from '~/components/Checkbox/Checkbox.types';
export type { ICheckboxGroup } from '~/components/CheckboxGroup/CheckboxGroup.types';
export type { IRadio, IRadioLabel } from '~/components/Radio/Radio.types';
export type { IRadioGroup } from '~/components/RadioGroup/RadioGroup.types';
export type {
	ISliderRoot,
	ISliderTrack,
	ISliderRange,
	ISliderThumb
} from '~/components/Slider/Slider.types';

// Hooks
// `useKeyboardActivation` is public because every package downstream of this one already depends
// on `@repo/ui-core`, so adopting it later needs no new plumbing. `useDebouncedValue` stays
// internal until something outside this package actually needs it.
export { useKeyboardActivation } from '~/hooks/useKeyboardActivation';
export type {
	NativeKeyboardActivation,
	KeyboardActivationProps,
	UseKeyboardActivationOptions,
	UseKeyboardActivationResult
} from '~/hooks/useKeyboardActivation.types';

// Icon dictionary (the set of names `Icon` accepts)
export { ICON_NAMES } from '~/components/Icon/Icon.constants';
export type { IconName } from '~/components/Icon/Icon.constants';

// Variants (for consumers who need to extend)
export { buttonVariants } from '~/components/Button/variants';
export { iconVariants } from '~/components/Icon/Icon.variants';
export { badgeVariants } from '~/components/Badge/Badge.variants';
export { alertVariants } from '~/components/Alert/Alert.variants';
export { labelVariants } from '~/components/Label/Label.variants';
export {
	searchWrapperVariants,
	searchClearButtonVariants
} from '~/components/Search/Search.variants';
