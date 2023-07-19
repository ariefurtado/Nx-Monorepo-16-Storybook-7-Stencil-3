import { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '@monorepo/web-components-react';
import { expectToBeRendered } from 'packages/web-components/.storybook/interactions';

export default {
  title: 'Deep/Teste',
  component: MyComponent,
  args: {
    tagname: 'my-component'
  }
} as Meta;

const Template = ({ tagname }) => (
  <MyComponent data-testid= { tagname } middle = "^^" first = "Teste" last = "Done!" />
);

export const Default: StoryObj<any> = {
  render: Template.bind({}),
  play: async ({ canvasElement, args }) => {
    await expectToBeRendered(canvasElement, args.tagname);
  }
}
