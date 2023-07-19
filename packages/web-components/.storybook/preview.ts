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
            disable: true
        }
    }
};
