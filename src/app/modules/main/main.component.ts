import {AppState} from '@/store/state';
import {ToggleSidebarMenu} from '@/store/ui/actions';
import {UiState} from '@/store/ui/state';
import {Component, OnInit, Renderer2} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  host: {'[class.app-wrapper]': `true`}
})
export class MainComponent implements OnInit {
  public ui: Observable<UiState> = new Observable<UiState>();

  constructor(private renderer: Renderer2, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.ui = this.store.select('ui');
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
    this.renderer.addClass(document.querySelector('app-root'), 'layout-fixed');

    this.ui.subscribe(
      ({menuSidebarCollapsed, darkMode}) => {
        if (menuSidebarCollapsed) {
          this.renderer.removeClass(document.querySelector('app-root'), 'sidebar-open');
          this.renderer.addClass(document.querySelector('app-root'), 'sidebar-collapse');
        } else {
          this.renderer.removeClass(document.querySelector('app-root'), 'sidebar-collapse');
          this.renderer.addClass(document.querySelector('app-root'), 'sidebar-open');
        }

        if (darkMode) {
          this.renderer.setAttribute(document.querySelector('body'), 'data-bs-theme', 'dark');
        } else {
          this.renderer.removeAttribute(document.querySelector('body'), 'data-bs-theme');
        }
      }
    );
  }

  onToggleMenuSidebar() {
    this.store.dispatch(new ToggleSidebarMenu());
  }

  onHover() {
    this.renderer.addClass(document.querySelector('app-root'), 'sidebar-is-hover');
  }

  onLeave() {
    this.renderer.removeClass(document.querySelector('app-root'), 'sidebar-is-hover');
  }
}
