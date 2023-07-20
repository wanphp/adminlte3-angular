export default <UiState>{
  darkMode: localStorage.getItem('darkMode') == 'true',
  menuSidebarCollapsed: window.innerWidth < 768
};

export interface UiState {
  darkMode: boolean;
  menuSidebarCollapsed: boolean;
}
