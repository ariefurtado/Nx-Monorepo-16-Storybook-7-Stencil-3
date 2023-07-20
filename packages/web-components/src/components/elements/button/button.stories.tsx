import { Meta, StoryContext, StoryFn, StoryObj } from "@storybook/react";
import { MyButton } from '@monorepo/web-components-react';
import { customPlay } from "packages/web-components/.storybook/interactions";
import { myButtonTests } from "./button.spec";


export default {
  title: 'Elements/Button',
  component: MyButton,
  args: {
    tagname: 'my-button',
  },
} as Meta;

const ContentText = () => <p>Take me to the server!</p>;

const GenericTemplate: StoryFn = ({ Content, ...args }) => (
  <MyButton {...args}>
    <Content />
  </MyButton>
);

export const Button: StoryObj = {
  render: GenericTemplate.bind({}),
  play: async (ctx: StoryContext) =>
  await customPlay(
    ctx,
    myButtonTests,
    async () => console.log('i am before'),
    async (data = 'bla bla bla') => console.log('i am after', data)
  ),
}
Button.args = {
  Content: ContentText,
  disabled: false,
  ['data-testid']: 'my-button'
};