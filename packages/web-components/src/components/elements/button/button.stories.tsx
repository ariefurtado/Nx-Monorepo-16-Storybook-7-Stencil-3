import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { MyButton } from '@monorepo/web-components-react';
import { customPlay } from 'packages/web-components/.storybook/interactions';
import { myButtonBaseTests, myButtonDefaultTests, myButtonDisabledTests } from './button.spec';


const meta: Meta<typeof MyButton> = {
  component: MyButton,
  args: {
    disabled: false,
    ['data-testid']: 'my-button'
  },
  play: async (ctx) => await customPlay(ctx, myButtonBaseTests)
};
export default meta;

const GenericTemplate: StoryFn = (args) => {
  return (
    <MyButton {...args}>
      <p>Take me to the server!</p>
    </MyButton>
  );
};

export const Default: StoryObj = {
  render: GenericTemplate,
  play: async (ctx) => {
    await meta.play(ctx)  
    await customPlay(ctx, myButtonDefaultTests)
  }
};

export const CTA: StoryObj = {
  render: GenericTemplate,
  play: async (ctx) => {
    await meta.play(ctx);
    await customPlay(ctx, myButtonBaseTests)
  },
};

export const Disabled: StoryObj = {
  render: GenericTemplate,
  args: {
    ...meta.args,
    disabled: true,
  },
  play: async (ctx) => { 
    await meta.play(ctx);
    await customPlay(ctx, myButtonDisabledTests)
  }
};
