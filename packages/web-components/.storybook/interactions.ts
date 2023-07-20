import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { StoryContext } from '@storybook/react';

export async function withinShadowRoot(
  canvasElement: HTMLElement,
  selector: string
) {
  const webc = canvasElement.querySelector(selector) as HTMLElement;
  expect(webc).not.toBe<HTMLElement>(null!);

  await waitFor(() => {
    const shadowRootFirstEl = webc!.shadowRoot!
      .firstElementChild as HTMLElement;
    return expect(shadowRootFirstEl).toContainElement(shadowRootFirstEl);
  });

  // bypass type checking of "within" function
  return within(webc.shadowRoot as any);
}

export async function expectToBeRendered(
  canvasElement: HTMLElement,
  tagname: string
) {
  const canvas = within(canvasElement);
  const el = await canvas.findByTestId(tagname);

  // Wait for web-component to be visible/hydra ted
  await waitFor(() => expect(el).toBeVisible());
}

export async function customPlay(
  ctx: StoryContext,
  cb: (ctx: StoryContext) => Promise<void>,
  before?: () => Promise<void>,
  after?: (data?: any) => Promise<void>
) {
  await before?.();
  await cb(ctx);
  await after?.();
}
