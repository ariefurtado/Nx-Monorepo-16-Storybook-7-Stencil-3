import { MyButton } from '@monorepo/web-components-react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { customPlay } from 'packages/web-components/.storybook/interactions';
import { ButtonLayout, ButtonTypes } from './button.model';
import {
  myButtonBaseTests,
  myButtonCTATests,
  myButtonDefaultTests,
  myButtonDisabledTests,
  myButtonLinkTests,
  myButtonResetTests,
  myButtonSubmitTests,
} from './button.spec';

const meta: Meta<typeof MyButton> = {
  title: 'Elements/Button',
  component: MyButton,
  argTypes: {
    layout: {
      control: 'inline-radio',
      options: [...Object.values(ButtonLayout)],
    },
    type: {
      control: 'inline-radio',
      options: [...Object.values(ButtonTypes)],
    },
  },
  args: {
    disabled: false,
    layout: ButtonLayout.DEFAULT,
    ['data-testid']: 'my-button',
  },
  play: async (ctx) => await customPlay(ctx, myButtonBaseTests),
};
export default meta;

const GenericTemplate: StoryFn = (args) => {
  return (
    <MyButton {...args} onClick={action('on click')}>
      <p>Take me to the server</p>
    </MyButton>
  );
};

export const Default: StoryObj = {
  name: 'Layout/Default',
  render: GenericTemplate,
  args: {
    ...meta.args,
    key: window.crypto.randomUUID(),
  },
  play: async (ctx) => {
    await meta.play(ctx);
    await customPlay(ctx, myButtonDefaultTests);
  },
};

export const CTA: StoryObj = {
  name: 'Layout/CTA',
  render: GenericTemplate,
  args: {
    ...meta.args,
    layout: ButtonLayout.CTA,
    key: window.crypto.randomUUID(),
  },
  play: async (ctx) => {
    await meta.play(ctx);
    await customPlay(ctx, myButtonCTATests);
  },
};

export const Disabled: StoryObj = {
  name: 'Layout/Disabled',
  render: GenericTemplate,
  args: {
    ...meta.args,
    disabled: true,
    key: window.crypto.randomUUID(),
  },
  play: async (ctx) => {
    await meta.play(ctx);
    await customPlay(ctx, myButtonDisabledTests);
  },
};

export const Link: StoryObj = {
  name: 'Href/Render as link',
  render: GenericTemplate,
  args: {
    href: 'https://puzzl.com.br',
    target: '_blank',
    key: window.crypto.randomUUID(),
  },
  play: async (ctx) => {
    await meta.play(ctx);
    await customPlay(ctx, myButtonLinkTests);
  },
};

export const Submit: StoryObj = {
  name: 'Type/Submit',
  render: GenericTemplate,
  args: {
    ...meta.args,
    type: ButtonTypes.SUBMIT,
    key: window.crypto.randomUUID(),
  },
  play: async (ctx) => {
    await meta.play(ctx);
    await customPlay(ctx, myButtonSubmitTests);
  },
};

export const Reset: StoryObj = {
  name: 'Type/Reset',
  render: GenericTemplate,
  args: {
    ...meta.args,
    type: ButtonTypes.RESET,
    key: window.crypto.randomUUID(),
  },
  play: async (ctx) => {
    await meta.play(ctx);
    await customPlay(ctx, myButtonResetTests);
  },
};
