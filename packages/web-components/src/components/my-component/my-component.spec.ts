import { StoryContext } from '@storybook/react';
import { expectToBeRendered } from 'packages/web-components/.storybook/interactions';

export const tagname = 'my-component'

export async function myComponentTests({ canvasElement, step }: StoryContext) {
  await step(`${tagname} should render`, async () => expectToBeRendered(canvasElement, tagname))
}

// describe('my-component', () => {
//   it('renders', async () => {
//     const { root } = await newSpecPage({
//       components: [MyComponent],
//       html: '<my-component></my-component>',
//     });
//     expect(root).toEqualHtml(`
//       <my-component>
//         <mock:shadow-root>
//           <div>
//             Hello, World! I'm
//           </div>
//         </mock:shadow-root>
//       </my-component>
//     `);
//   });

//   it('renders with values', async () => {
//     const { root } = await newSpecPage({
//       components: [MyComponent],
//       html: `<my-component first="Stencil" last="'Don't call me a framework' JS"></my-component>`,
//     });
//     expect(root).toEqualHtml(`
//       <my-component first="Stencil" last="'Don't call me a framework' JS">
//         <mock:shadow-root>
//           <div>
//             Hello, World! I'm Stencil 'Don't call me a framework' JS
//           </div>
//         </mock:shadow-root>
//       </my-component>
//     `);
//   });
// });
