import {ElementRef, ViewContainerRef} from "@angular/core";

export default <UiState>{
  darkMode: localStorage.getItem('darkMode') == 'true',
  menuSidebarCollapsed: window.innerWidth < 768
};

export interface UiState {
  darkMode: boolean;
  menuSidebarCollapsed: boolean;
  viewContainerRef?: ViewContainerRef;
  elementRef?: ElementRef;
  wx?: any;
}
