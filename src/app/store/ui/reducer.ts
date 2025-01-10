import {createReducer, on} from '@ngrx/store';
import {ElementRef, ViewContainerRef} from '@angular/core';
import {
  dynamicBuildContainerAction,
  dynamicBuildElementAction,
  registerWechatAction,
  sidebarAction,
  styleAction
} from './actions';

export interface UiState {
  sidebarCollapsed: boolean;
  darkMode: boolean;
  container: ViewContainerRef | null;
  element: ElementRef | null;
  wx: any | null;
}

export const initialState: UiState = {
  sidebarCollapsed: window.innerWidth < 768,
  darkMode: localStorage.getItem('darkMode') == 'true',
  container: null,
  element: null,
  wx: null
};

export const uiReducer = createReducer(
  initialState,
  on(sidebarAction, (state) => ({...state, sidebarCollapsed: !state.sidebarCollapsed})),
  on(styleAction, (state) => ({...state, darkMode: !state.darkMode})),
  on(dynamicBuildContainerAction, (state, {container}) => ({...state, container})),
  on(dynamicBuildElementAction, (state, {element}) => ({...state, element})),
  on(registerWechatAction, (state, {wx}) => ({...state, wx})),
);
