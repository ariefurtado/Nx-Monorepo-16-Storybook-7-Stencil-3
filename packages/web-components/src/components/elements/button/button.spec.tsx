// import { expect } from '@storybook/jest';
import { expect, jest } from '@storybook/jest';
import { ReactRenderer } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import type { PlayFunctionContext } from '@storybook/types';
import {
  expectToBeRendered,
  withinShadowRoot,
} from 'packages/web-components/.storybook/interactions';
import { MyButtonModel } from './button.model';

type TestsArgs = PlayFunctionContext<ReactRenderer, MyButtonModel>;

export const tagname = 'my-button';

export async function myButtonBaseTests({ canvasElement, step }: TestsArgs) {
  await expectToBeRendered(canvasElement, tagname, step);
}

export async function myButtonDefaultTests({ canvasElement, step }: TestsArgs) {
  await step('should have pointer cursor', async () => {
    // Arrange
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

    //Act
    const buttonCursor = window.getComputedStyle(button).cursor;

    // Assert
    expect(buttonCursor).toBe('pointer');
  });

  await step('should have a purple background color', async () => {
    // Arrange
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

    //Act
    const buttonBgColor = window.getComputedStyle(button).backgroundColor;

    // Assert
    expect(buttonBgColor).toBe('rgb(128, 0, 128)');
  });

  // https://github.com/testing-library/jest-dom/issues/59

  // await step('should have a blue background color on hover', async () => {
  //   // Arrange
  //   const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
  //   const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

  //   //Act
  // await userEvent.hover(button);

  //   // Assert
  //   waitFor(() =>
  //     expect(button).tohave(`
  //   background-color: #0a034b;
  // `)
  //   );
  // });

  await step('should call the onClick handler', async () => {
    // Arrange
    const handleClick = jest.fn();
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

    //Act
    button.onclick = handleClick;
    await userEvent.click(button);

    // Assert
    expect(handleClick).toHaveBeenCalled();
  });
}

export async function myButtonCTATests({ canvasElement, step }: TestsArgs) {
  await step('should have pointer cursor', async () => {
    // Arrange
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

    //Act
    const buttonCursor = window.getComputedStyle(button).cursor;

    // Assert
    expect(buttonCursor).toBe('pointer');
  });

  await step('should have a red background-color', async () => {
    // Arrange
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

    //Act
    const buttonBgColor = window.getComputedStyle(button).backgroundColor;

    // Assert
    expect(buttonBgColor).toBe('rgb(202, 29, 29)');
  });

  await step('should call the onClick handler', async () => {
    // Arrange
    const handleClick = jest.fn();
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

    //Act
    button.onclick = handleClick;
    await userEvent.click(button);

    // Assert
    expect(handleClick).toHaveBeenCalled();
  });
}

export async function myButtonDisabledTests({
  canvasElement,
  step,
}: TestsArgs) {
  await step('should have a gray background-color', async () => {
    // Arrange
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

    //Act
    const buttonBgColor = window.getComputedStyle(button).backgroundColor;

    // Assert
    expect(buttonBgColor).toBe('rgb(138, 138, 138)');
  });

  await step('should not call the onClick handler', async () => {
    // Arrange
    const handleClick = jest.fn();
    const canvas = within(canvasElement);
    const myButton: HTMLMyButtonElement = await canvas.findByTestId(tagname);
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

    // Act
    button.onclick = handleClick;
    myButton.disabled = true;

    // Assert
    await waitFor(() => expect(button).toHaveAttribute('disabled'));
    await userEvent.click(button, { pointerEventsCheck: 0 });
    expect(handleClick).not.toHaveBeenCalled();
  });
}

export async function myButtonLinkTests({ canvasElement, step }: TestsArgs) {
  await step('should have pointer cursor', async () => {
    // Arrange
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('link');

    //Act
    const buttonCursor = window.getComputedStyle(button).cursor;

    // Assert
    expect(buttonCursor).toBe('pointer');
  });

  await step('should be an <a> tag', async () => {
    // Arrange
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const link: HTMLAnchorElement = await myButtonShadow.findByRole('link');

    //Act

    // Assert
    expect(link.tagName).toBe('A');
  });
}

export async function myButtonSubmitTests({ canvasElement, step }: TestsArgs) {
  await step("should have the type attribute as 'submit'", async () => {
    // Arrange
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

    // Act
    const buttonType = button.type;

    // Assert
    expect(buttonType).toBe('submit');
  });

  await step('should call the form onSubmit handler', async () => {
    // Arrange
    const canvas = within(canvasElement);
    const el = await canvas.findByTestId(tagname);
    const form = document.createElement('form');
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');
    const handleSubmit = jest.fn((e: SubmitEvent) => e.preventDefault()); // Prevent page from navigate

    // Act
    form.append(el);
    canvasElement.append(form);
    form.onsubmit = handleSubmit;
    await userEvent.click(button);

    // Assert
    expect(handleSubmit).toHaveBeenCalled();

    // Cleanup
    canvasElement.removeChild(form);
    canvasElement.append(el);
  });
}

export async function myButtonResetTests({ canvasElement, step }: TestsArgs) {
  await step("should have the type attribute as 'reset'", async () => {
    // Arrange
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

    // Act
    const buttonType = button.type;

    // Assert
    expect(buttonType).toBe('reset');
  });

  await step('should call the form onReset handler', async () => {
    // Arrange
    const canvas = within(canvasElement);
    const el = await canvas.findByTestId(tagname);
    const form = document.createElement('form');
    const handleReset = jest.fn();
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

    // Act
    form.append(el);
    canvasElement.append(form);
    form.onreset = handleReset;
    await userEvent.click(button);

    // Assert
    expect(handleReset).toHaveBeenCalled();

    // Cleanup
    canvasElement.removeChild(form);
    canvasElement.append(el);
  });
}
