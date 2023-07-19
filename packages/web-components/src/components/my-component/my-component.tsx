import { Component, Prop, State, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {
  @State() isClicked = false;

  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return (
      <div>
        <p>Hello, World! I'm {this.getText()}</p>
        
        {!this.isClicked ? (
          <button onClick={() => this.isClicked = true}>click me</button>
        ) : (
          <p>It was clicked!</p>
        )}
      </div>
    );
  }
}
