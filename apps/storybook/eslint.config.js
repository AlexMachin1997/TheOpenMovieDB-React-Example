import { config } from '@repo/eslint-config/react';
import { createConfig } from '@repo/eslint-config/utils';

export default createConfig(import.meta.dirname, config);
