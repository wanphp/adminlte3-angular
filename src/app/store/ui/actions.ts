import {Action} from '@ngrx/store';

export const TOGGLE_SIDEBAR_MENU: string = 'TOGGLE_SIDEBAR_MENU';
export const TOGGLE_DARK_MODE: string = 'TOGGLE_DARK_MODE';
export const SET_ViewContainerRef: string = 'SET_ViewContainerRef';
export const SET_ElementRef: string = 'SET_ElementRef';
export const REG_WX: string = 'REG_WX';

export class ToggleSidebarMenu implements Action {
  readonly type: string = TOGGLE_SIDEBAR_MENU;

  constructor(public payload?: any) {
  }
}

export class ToggleDarkMode implements Action {
  readonly type: string = TOGGLE_DARK_MODE;

  constructor(public payload?: any) {
  }
}

export class SetViewContainerRef implements Action {
  readonly type: string = SET_ViewContainerRef;

  constructor(public payload: any) {
  }
}

export class SetElementRef implements Action {
  readonly type: string = SET_ElementRef;

  constructor(public payload: any) {
  }
}

export class RegWx implements Action {
  readonly type: string = REG_WX;

  constructor(public payload: any) {
  }
}

export type UiAction =
  | ToggleSidebarMenu
  | ToggleDarkMode
  | SetViewContainerRef
  | SetElementRef
  | RegWx;
