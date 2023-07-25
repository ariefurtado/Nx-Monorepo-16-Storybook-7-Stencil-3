export enum ButtonTypes {
    BUTTON = 'button',
    SUBMIT = 'submit',
    RESET = 'reset',
  }
  
  export enum ButtonLayout {
    CTA = 'cta',
    DEFAULT = 'default',
  }
    
  export interface MyButtonModel {
    type: ButtonTypes;
    disabled: boolean;
    isClear: boolean;
    href: string;
    target: string;
    icon: string;
    layout: ButtonLayout;
  }
  