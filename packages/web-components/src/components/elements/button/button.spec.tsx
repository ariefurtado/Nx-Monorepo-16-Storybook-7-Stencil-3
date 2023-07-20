// import { expect } from '@storybook/jest';
import { expect, jest } from '@storybook/jest';
import { StoryContext } from '@storybook/react';
import { within, userEvent, fireEvent  } from '@storybook/testing-library';
import { expectToBeRendered, withinShadowRoot } from 'packages/web-components/.storybook/interactions';

export const tagname = 'my-button'

export async function myButtonTests({ canvasElement, step }: StoryContext) {
  await step(`${tagname} should render`, async () => expectToBeRendered(canvasElement, tagname))

  await step('should click the button', async () => {
    const handleClick = jest.fn(() => console.log('opa'));
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button')
    
    button.onclick = handleClick

    await userEvent.click(button)
    expect(handleClick).toHaveBeenCalled()
  })

  await step('should disable the button', async () => {
    const handleClick = jest.fn(() => console.log('opa'));
    const canvas = within(canvasElement)
    const myButton: HTMLMyButtonElement = await canvas.findByTestId(tagname)
    const myButtonShadow = await withinShadowRoot(canvasElement, tagname);
    const button: HTMLButtonElement = await myButtonShadow.findByRole('button')
    
    button.onclick = handleClick;
    myButton.disabled = true;
    await userEvent.click(button, {
      pointerEventsCheck: 0
    })
    // await userEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })
}