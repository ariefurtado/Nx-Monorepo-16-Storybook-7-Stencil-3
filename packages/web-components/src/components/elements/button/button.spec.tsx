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

  await step('should have a cursor pointer css rule', async () => {
    // Arrange
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

    //Act

    // Assert
    expect(button).toHaveStyle(`
      cursor: pointer
    `);
  });
}

export async function myButtonDefaultTests({ canvasElement, step }: TestsArgs) {
  await step('should have a purple background color', async () => {
    // Arrange
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

    //Act

    // Assert
    expect(button).toHaveStyle(`
      background-color: #800080;
    `);
  });

  // https://github.com/testing-library/jest-dom/issues/59

  // await step('should have a blue background color on hover', async () => {
  //   // Arrange
  //   const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
  //   const button: HTMLButtonElement = await myButtonShadow.findByRole('button');

  //   //Act
  //   await userEvent.hover(button);

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
