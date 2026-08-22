// Components
export {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent
} from '~/components/Accordion';
export { Alert, AlertTitle, AlertDescription } from '~/components/Alert';
export { Avatar, AvatarImage, AvatarFallback } from '~/components/Avatar';
export { Badge } from '~/components/Badge';
export { Button } from '~/components/Button';
export { Icon } from '~/components/Icon';
export { Label } from '~/components/Label';
export { Progress } from '~/components/Progress';
export { Skeleton } from '~/components/Skeleton';
export { Switch } from '~/components/Switch';
export { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/Tabs';
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '~/components/Tooltip';
export { Search } from '~/components/Search';
export { DebouncableInput } from '~/components/DebouncableInput';

// `Field` composes a label, a control, a description and an error, and wires them together for
// assistive technology. It has no form-library dependency — `@repo/ui-forms`' `FormField` is the
// TanStack layer on top. `FieldMessage`, which it renders internally, is deliberately NOT exported;
// see docs/05-ui-forms-field-pattern/spec.md.
export { Field } from '~/components/Field';
export type { IField, IFieldControlProps } from '~/components/Field';

// Form primitives. These live here rather than in `@repo/ui-forms` because the package boundary is
// drawn by dependency footprint, not by category — nothing below needs `ui-overlays` or
// `ui-command`. See docs/04-ui-forms-primitive-migration/spec.md, Decisions.
export { Input } from '~/components/Input';
export { Textarea } from '~/components/Textarea';
export { Checkbox, CheckboxLabel } from '~/components/Checkbox';
export { CheckboxGroup } from '~/components/CheckboxGroup';
export { Radio, RadioLabel } from '~/components/Radio';
export { RadioGroup } from '~/components/RadioGroup';
export { SliderRange, SliderThumb, SliderTrack, SliderRoot } from '~/components/Slider';
export { Calendar, CalendarDayButton } from '~/components/Calendar';

export type { ILabel, ILabelNative, ILabelNonNative } from '~/components/Label';
export type { IInput } from '~/components/Input';
export type { ITextarea } from '~/components/Textarea';
export type { ICheckbox, ICheckboxLabel } from '~/components/Checkbox';
export type { ICheckboxGroup } from '~/components/CheckboxGroup';
export type { IRadio, IRadioLabel } from '~/components/Radio';
export type { IRadioGroup } from '~/components/RadioGroup';
export type { ISliderRoot, ISliderTrack, ISliderRange, ISliderThumb } from '~/components/Slider';

// Hooks
// `useKeyboardActivation` is public because every package downstream of this one already depends
// on `@repo/ui-core`, so adopting it later needs no new plumbing. `useDebouncedValue` stays
// internal until something outside this package actually needs it.
export { useKeyboardActivation } from '~/hooks';
export type {
	NativeKeyboardActivation,
	IKeyboardActivationProps,
	IUseKeyboardActivationOptions,
	IUseKeyboardActivationResult
} from '~/hooks';

// Icon dictionary (the set of names `Icon` accepts)
export { ICON_NAMES } from '~/components/Icon';
export type { IconName } from '~/components/Icon';
