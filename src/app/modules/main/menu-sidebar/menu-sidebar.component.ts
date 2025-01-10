import {Component, HostBinding, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {RouterLink} from "@angular/router";
import {MenuItemComponent} from '../../../components/menu-item/menu-item.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {AuthState} from '../../../store/auth/reducer';
import {UserModel} from '../../../model/user.model';

const BASE_CLASSES = 'app-sidebar bg-body-tertiary shadow';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  standalone: true,
  imports: [
    MenuItemComponent,
    NgForOf,
    NgbTooltip,
    RouterLink
  ],
  styleUrls: ['./menu-sidebar.component.css']
})
export class MenuSidebarComponent implements OnInit {
  @HostBinding('class') classes: string = BASE_CLASSES;
  public user: UserModel | null = null;
  public menu: any;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('auth').subscribe(({loginUser}: AuthState) => {
      this.user = loginUser;
    });
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
