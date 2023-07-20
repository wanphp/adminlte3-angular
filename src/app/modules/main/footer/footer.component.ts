import {Component, OnInit} from '@angular/core';
import packageInfo from './../../../../../package.json';
import {Observable} from "rxjs";
import {UiState} from "@/store/ui/state";
import {Store} from "@ngrx/store";
import {AppState} from "@/store/state";
import {ToggleDarkMode} from "@/store/ui/actions";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  host: {'[class.app-footer]': `true`,'[class.bg-body-secondary]':`true`}
})
export class FooterComponent implements OnInit {
  public appVersion = packageInfo.version;
  public currentYear: number = (new Date()).getFullYear();
  public ui: Observable<UiState> = new Observable<UiState>();
  public darkMode: boolean = false;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.ui = this.store.select('ui');
    this.ui.subscribe((state: UiState) => {
      this.darkMode = state.darkMode;
    });
  }

  public handleDarkModeChange() {
    localStorage.setItem('darkMode', String(!this.darkMode));
    this.store.dispatch(new ToggleDarkMode());
  }
}
