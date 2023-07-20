import {Action} from '@ngrx/store';

export const TOGGLE_SIDEBAR_MENU: string = 'TOGGLE_SIDEBAR_MENU';
export const TOGGLE_DARK_MODE: string = 'TOGGLE_DARK_MODE';

export class ToggleSidebarMenu implements Action {
  readonly type: string = TOGGLE_SIDEBAR_MENU;

  constructor(public payload?: string) {
  }
}

export class ToggleDarkMode implements Action {
  readonly type: string = TOGGLE_DARK_MODE;

  constructor(public payload?: string) {
  }
}

export type UiAction =
  | ToggleSidebarMenu
  | ToggleDarkMode;
