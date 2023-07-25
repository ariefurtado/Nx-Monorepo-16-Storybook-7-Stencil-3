// const Base: DecoratorFn = (Story, options) => {
//   return (
//     <TestReactRoot {...options.args}>
//       <Story {...options} />
//     </TestReactRoot>
//   );
// };

export const argTypes = {
  tagname: {
    table: {
      disable: true,
    },
  },
  ['data-testid']: {
    table: {
      disable: true,
    },
  },
};

export const parameters = {
  backgrounds: {
    default: 'dark',
  },
  actions: { argTypesRegex: '^on.*' },
};
