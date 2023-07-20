export enum ButtonTypes {
    BUTTON = 'button',
    SUBMIT = 'submit',
    RESET = 'reset',
  }
  
  export enum ButtonLayout {
    CTA = 'cta',
    NEWSLETTER = 'newsletter',
    ICON = 'icon',
    ARTIST_PAGE_CTA = 'artist-page-cta',
  }
  
  export enum ButtonColor {
    GRADIENT = 'gradient',
    WHITE = 'white',
    OUTLINED = 'outlined',
  }
  
  export interface TrpButtonModel {
    type: ButtonTypes;
    disabled: boolean;
    isClear: boolean;
    href: string;
    target: string;
    icon: string;
    layout: ButtonLayout;
    color: ButtonColor;
  }
  