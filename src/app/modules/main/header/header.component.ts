import {AppState} from '../../../store';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {OAuthService} from "angular-oauth2-oidc";
import {UiState} from '../../../store/ui/reducer';
import {sidebarAction} from '../../../store/ui/actions';
import {RouterLink} from '@angular/router';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';

const BASE_CLASSES = 'app-header navbar navbar-expand bg-body-secondary';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @HostBinding('class') classes: string = BASE_CLASSES;
  public ui: Observable<UiState> = new Observable<UiState>();

  constructor(
    private oauthService: OAuthService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.oauthService.logOut();
    location.reload();
  }

  onToggleMenuSidebar() {
    this.store.dispatch(sidebarAction());
  }
}
