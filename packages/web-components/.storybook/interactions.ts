import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export async function withinShadowRoot(canvasElement: HTMLElement, selector: string) {
    const webc = canvasElement.querySelector(selector) as HTMLElement;
    expect(webc).not.toBe<HTMLElement>(null!);

    await waitFor(() => {
        const shadowRootFirstEl = webc!.shadowRoot!.firstElementChild as HTMLElement;
        return expect(shadowRootFirstEl).toContainElement(shadowRootFirstEl);
    });

    // bypass type checking of "within" function
    return within(webc.shadowRoot as any);
}

export async function expectToBeRendered(canvasElement, tagname) {
    const canvas = within(canvasElement);
    const el = await canvas.findByTestId(tagname);

    // Wait for web-component to be visible/hydra ted
    await waitFor(() => expect(el).toBeVisible());
}
