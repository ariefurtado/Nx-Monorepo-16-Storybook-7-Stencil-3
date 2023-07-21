// import { expect } from '@storybook/jest';
import { expect, jest } from '@storybook/jest';
import { StoryContext } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import {
  expectToBeRendered,
  withinShadowRoot,
} from 'packages/web-components/.storybook/interactions';

export const tagname = 'my-button';

export async function myButtonBaseTests({ canvasElement, step }: StoryContext) {
  await expectToBeRendered(canvasElement, tagname, step);
}

export async function myButtonDefaultTests({
  canvasElement,
  step,
}: StoryContext) {
  await step('should have a purple background color', async () => {
    // Arrange
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button');
    setTimeout(() => {
      console.log('>> button.background', button.style.backgroundColor);
      console.log('>> button.background', button.style);
      
    }, 1000);

    
    //Act
    
    // Assert
    await waitFor(() => expect(button.style.backgroundColor).toBe('purple'));

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

export async function myButtonCTATests({ canvasElement, step }: StoryContext) {
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
}: StoryContext) {
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
