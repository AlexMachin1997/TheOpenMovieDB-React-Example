import { config } from '@repo/eslint-config/react';
import { folderStructure } from '@repo/eslint-config/folder-structure';
import { createConfig } from '@repo/eslint-config/utils';

export default createConfig(import.meta.dirname, config, folderStructure(import.meta.dirname));
