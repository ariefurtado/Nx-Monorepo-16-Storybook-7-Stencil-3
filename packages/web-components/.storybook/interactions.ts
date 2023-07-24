import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { PlayFunctionContext } from '@storybook/types';
import { ReactRenderer } from '@storybook/react';

interface Args {
  [name: string]: any;
}

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
  tagname: string,
  step: any
) {
  await step(`should render`, async () => {
    const canvas = within(canvasElement);
    const el = await canvas.findByTestId(tagname);

    // Wait for web-component to be visible/hydrated
    await waitFor(() => expect(el).toBeVisible());
  });
}

export async function customPlay<T = Args>(
  ctx: PlayFunctionContext<ReactRenderer, T>,
  cb: (ctx: PlayFunctionContext<ReactRenderer, T>) => Promise<void>,
  before?: () => Promise<void>,
  after?: (data?: any) => Promise<void>
) {
  await before?.();
  await cb(ctx);
  await after?.();
}
