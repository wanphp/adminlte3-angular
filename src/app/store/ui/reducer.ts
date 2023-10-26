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
    case Actions.SET_ViewContainerRef:
      return {
        ...state,
        viewContainerRef: action.payload
      };
    case Actions.SET_ElementRef:
      return {
        ...state,
        elementRef: action.payload
      };
    case Actions.REG_WX:
      return {
        ...state,
        wx: action.payload
      };
    default:
      return state;
  }
}
