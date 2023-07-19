import { Config } from '@stencil/core';

import { sass } from '@stencil/sass';

import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'web-components',
  taskQueue: 'async',
  sourceMap: true,

  extras: {
    experimentalImportInjection: true,
  },
  plugins: [sass()],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-hydrate-script',
      dir: 'dist/hydrate',
    },
    reactOutputTarget({
      componentCorePackage: '@monorepo/web-components',
      proxiesFile:
        '../../../packages/web-components-react/src/generated/components.ts',
      includeDefineCustomElements: true,
    }),
  ],
};
