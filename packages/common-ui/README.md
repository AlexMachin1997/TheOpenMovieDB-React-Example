# @repo/common-ui

A shared UI component library for The Open Movie Database React application. This package serves as an isolated UI library where we can build and maintain our own custom components.

## Overview

This package is designed to be a centralized location for reusable UI components that can be shared across different parts of the application. It provides a clean, maintainable structure for building custom components with proper TypeScript support, Storybook documentation, and testing setup.

## Features

- **TypeScript Support**: Full type safety with proper type definitions
- **Storybook Integration**: Interactive component documentation and testing
- **Testing Setup**: Vitest configuration with React Testing Library
- **Build System**: Vite-based build with proper library output
- **ESLint & Prettier**: Code quality and formatting tools
- **Monorepo Integration**: Workspace-aware package management

## Package Structure

```
src/
├── components/          # UI components
│   └── index.ts        # Component exports
├── types/              # TypeScript type definitions
│   └── index.ts        # Type exports
├── utils/              # Utility functions
│   └── index.ts        # Utility exports
├── test/               # Test setup and utilities
│   └── setup.ts        # Test configuration
└── index.ts            # Main package entry point
```

## Scripts

- `dev` / `storybook` - Start Storybook development server (port 6007)
- `build` - Build the library with type checking
- `build-lib` - Build the library without type checking
- `check-types` - Run TypeScript type checking
- `lint` - Run ESLint
- `prettier` - Format code with Prettier
- `test` - Run tests with Vitest
- `validate` - Run all validation checks (lint, types, tests)

## Development

### Adding New Components

1. Create a new folder in `src/components/`
2. Include the component file, stories file, and index file
3. Export the component from `src/components/index.ts`
4. Add any new types to `src/types/index.ts`

### Component Structure

Each component should follow this structure:

```
ComponentName/
├── ComponentName.tsx      # Main component
├── ComponentName.stories.tsx  # Storybook stories
└── index.ts               # Export file
```

### Building

The package builds to the `dist/` folder with:

- ES modules for modern bundlers
- TypeScript declaration files
- CSS output (when applicable)

## Dependencies

- **React 18+**: Core React library
- **TypeScript**: Type safety and development experience
- **Storybook**: Component documentation and testing
- **Vite**: Build tool and development server
- **Vitest**: Testing framework
- **Tailwind CSS**: Utility-first CSS framework

## Future Plans

This package is planned to integrate with shadcn/ui for a robust component foundation, while maintaining our custom components and design system.

## Usage

Import components from the package:

```tsx
import { ComponentName } from '@repo/common-ui';
```

## Contributing

1. Follow the established component structure
2. Include Storybook stories for all components
3. Write tests for component functionality
4. Update types as needed
5. Ensure all scripts pass before committing
