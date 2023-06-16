import * as Actions from './actions';
import {UiAction} from './actions';
import initialState, {UiState} from './state';

export function uiReducer(state: UiState = initialState, action: UiAction) {
  switch (action.type) {
    case Actions.TOGGLE_SIDEBAR_MENU:
      return {
        ...state,
        menuSidebarCollapsed: !state.menuSidebarCollapsed
      };
    case Actions.TOGGLE_CONTROL_SIDEBAR:
      return {
        ...state,
        controlSidebarCollapsed: !state.controlSidebarCollapsed
      };
    case Actions.TOGGLE_DARK_MODE:
      let variant: string;
      let skin: string;
      if (state.darkMode) {
        variant = 'navbar-light';
        skin = 'sidebar-light-primary';
      } else {
        variant = 'navbar-dark';
        skin = 'sidebar-dark-primary';
      }
      return {
        ...state,
        navbarVariant: variant,
        sidebarSkin: skin,
        darkMode: !state.darkMode
      };
    default:
      return state;
  }
}
