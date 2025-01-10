import {AppState} from '../../store';
import {Component, OnInit, Renderer2} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from './footer/footer.component';
import {MenuSidebarComponent} from './menu-sidebar/menu-sidebar.component';
import {HeaderComponent} from './header/header.component';
import {UiState} from '../../store/ui/reducer';
import {sidebarAction} from '../../store/ui/actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [
    FooterComponent,
    MenuSidebarComponent,
    HeaderComponent,
    RouterOutlet
  ],
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
      ({sidebarCollapsed, darkMode}: UiState) => {
        if (sidebarCollapsed) {
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
    this.store.dispatch(sidebarAction());
  }

  onHover() {
    this.renderer.addClass(document.querySelector('app-root'), 'sidebar-is-hover');
  }

  onLeave() {
    this.renderer.removeClass(document.querySelector('app-root'), 'sidebar-is-hover');
  }
}
