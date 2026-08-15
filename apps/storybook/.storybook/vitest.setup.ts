import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react-vite';
import { vi } from 'vitest';
import * as projectAnnotations from './preview';

// Freeze the clock for the whole suite. A story that seeds state from `new Date()` is a test that
// fails on whichever day its assertions happen to collide with, and passes every other day —
// Calendar's `Basic` selects today on mount while its play() asserts the 15th is *not* selected, so
// it failed only on the 15th of each month and looked like a Calendar bug the rest of the time.
//
// Only `Date` is faked, deliberately. Blanket fake timers stall `userEvent`, which relies on real
// timers for its inter-keystroke delays, so faking them would destabilise the whole suite to
// stabilise one story.
//
// Built from local-time components rather than an ISO string so no timezone can shift the day. The
// 10th is chosen to differ from any day-of-month a play() currently asserts on.
vi.useFakeTimers({ toFake: ['Date'] });
vi.setSystemTime(new Date(2026, 0, 10, 12, 0, 0));

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
