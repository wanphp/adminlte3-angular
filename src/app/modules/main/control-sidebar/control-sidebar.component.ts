import {AppState} from '@/store/state';
import {ToggleDarkMode} from '@/store/ui/actions';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-control-sidebar',
  templateUrl: './control-sidebar.component.html',
  styleUrls: ['./control-sidebar.component.css']
})
export class ControlSidebarComponent implements OnInit {
  @HostBinding('class') classes: string = 'control-sidebar control-sidebar-dark';
  public ui: Observable<UiState> = new Observable<UiState>();
  public navbarVariant: string = '';
  public darkMode: boolean = false;
  public sidebarSkin: string = '';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.ui = this.store.select('ui');
    this.ui.subscribe((state: UiState) => {
      this.navbarVariant = state.navbarVariant;
      this.darkMode = state.darkMode;
      this.sidebarSkin = state.sidebarSkin;
    });
  }

  public handleDarkModeChange() {
    this.store.dispatch(new ToggleDarkMode());
  }
}
