import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {OAuthService} from "angular-oauth2-oidc";

const BASE_CLASSES = 'app-sidebar bg-body-tertiary shadow';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css']
})
export class MenuSidebarComponent implements OnInit {
  @HostBinding('class') classes: string = BASE_CLASSES;
  public ui: Observable<UiState> = new Observable<UiState>();
  public user: any;
  public menu: any;

  constructor(public oauthService: OAuthService) {
  }

  ngOnInit() {
    this.user = this.oauthService.getIdentityClaims();
    this.menu = [
      {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
      },
      {
        name: 'Blank',
        iconClasses: 'fas fa-file',
        path: ['/blank']
      },
      {
        name: 'Main Menu',
        iconClasses: 'fas fa-folder',
        children: [
          {
            name: 'Sub Menu',
            iconClasses: 'far fa-address-book',
            path: ['/sub-menu-1']
          },
          {
            name: 'Blank',
            iconClasses: 'fas fa-file',
            path: ['/sub-menu-2']
          }
        ]
      }
    ]
  }
}
