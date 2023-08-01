// Dependencies
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from '@stencil/core';

// Utils
import { ButtonLayout, ButtonTypes } from './button.model';

@Component({
  tag: 'my-button',
  styleUrl: 'button.styles.scss',
  shadow: true,
})
export class MyButton {
  @Element() el!: HTMLElement;

  @Prop() type: ButtonTypes = ButtonTypes.BUTTON;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) isClear: boolean = false;
  @Prop() layout: ButtonLayout = ButtonLayout.DEFAULT;
  @Prop() href: string;
  @Prop() target: string;
  @Prop() active: boolean = false

  @Event() myBtnSubmited: EventEmitter<boolean>;
  @Event() myBtnReseted: EventEmitter<boolean>;

  handleClick(e: MouseEvent) {
    if (this.type === 'submit') {
      this.myBtnSubmited.emit(true);
      this.fakeNativeButtonClick(e);
    }

    if (this.type === 'reset') {
      this.myBtnReseted.emit(true);
      this.fakeNativeButtonClick(e);
    }
  }

  private fakeNativeButtonClick(e: MouseEvent) {
    const form = this.el.closest('form');

    if (form) {
      e.preventDefault();

      const fakeButton = document.createElement('button');
      fakeButton.type = this.type;
      fakeButton.style.display = 'none';
      form.appendChild(fakeButton);
      fakeButton.click();
      fakeButton.remove();
    }
  }

  render() {
    const { type, target, href, disabled, isClear, layout, active } = this;
    const TagType = href === undefined ? 'button' : 'a';
    const attrs =
      TagType === 'button'
        ? { type }
        : {
            href,
            target,
          };

    return (
      <Host
        aria-disabled={disabled ? 'true' : null}
        class={{
          [type]: true,
          disabled: disabled,
          isClear: isClear,
          [layout]: true,
        }}
      >
        <TagType
          {...attrs}
          class={{active: active}}
          disabled={disabled}
          onClick={(e: MouseEvent) => this.handleClick(e)}
        >
          <span class="button-inner">
            <slot></slot>
          </span>
        </TagType>
      </Host>
    );
  }
}
