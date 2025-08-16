# Date Utilities

Modular date formatting utilities with locale support.

## Structure

- **`types.ts`** - TypeScript type definitions and interfaces
- **`formats.ts`** - Predefined date format definitions (15 formats)
- **`formatters.ts`** - Core formatting functions for single dates
- **`ranges.ts`** - Smart date range formatting with optimization
- **`helpers.ts`** - Utility functions like format examples and descriptions
- **`index.ts`** - Comprehensive module exports with full JSDoc documentation

## Usage

```tsx
import {
	formatDate,
	formatDateRange,
	getDateFormatExamples,
	type DateFormatKey
} from '~/utils/dates';

// Format a single date
formatDate({ date: new Date() }); // "Apr 15, 2024" (default: medium)
formatDate({ date: new Date(), formatKey: 'long' }); // "April 15, 2024"
formatDate({ date: new Date(), formatKey: 'long', locale: frLocale }); // "15 avril 2024"

// Format a date range with smart optimization
formatDateRange({ startDate, endDate, formatKey: 'medium' });
// Same month: "Apr 15 - 20, 2024"
// Same year: "Apr 15 - May 20, 2024"
// Different years: "Dec 15, 2024 - Jan 20, 2025"

// Custom separators and prefixes
formatDateRange({
	startDate,
	endDate,
	formatKey: 'short',
	separator: ' → ',
	locale: deLocale
});

// Compact range formatting
formatDateRangeCompact({ startDate, endDate, locale: frLocale });
```

## Available Formats

- **Standard**: `full`, `fullShort`, `long`, `medium`, `short`
- **Technical**: `iso`, `compact`
- **Contextual**: `dayDate`, `dayShort`, `monthYear`, `monthShort`
- **International**: `european`, `europeanDot`
- **Components**: `weekday`, `month`, `year`
