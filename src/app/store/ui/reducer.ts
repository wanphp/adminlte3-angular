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
    case Actions.TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode
      };
    default:
      return state;
  }
}
