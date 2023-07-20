import { MyComponent } from '@monorepo/web-components-react';
import { Meta, StoryContext, StoryObj } from '@storybook/react';
import { customPlay } from 'packages/web-components/.storybook/interactions';
import { myComponentTests } from './my-component.spec';

export default {
  title: 'Deep/Teste',
  component: MyComponent,
  args: {
    tagname: 'my-component',
  },
} as Meta;

const Template = ({ tagname }) => (
  <MyComponent data-testid={tagname} middle="^^" first="Teste" last="Done!" />
);

export const Default: StoryObj<any> = {
  render: Template.bind({}),
  play: async (ctx: StoryContext) =>
    await customPlay(
      ctx,
      myComponentTests,
      async () => console.log('i am before'),
      async (data = 'bla bla bla') => console.log('i am after', data)
    ),
};
