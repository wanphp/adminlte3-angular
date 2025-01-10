import {Component, HostBinding, Input, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router, RouterLinkActive} from '@angular/router';
import {filter} from 'rxjs/operators';
import {openCloseAnimation, rotateAnimation} from './menu-item.animations';
import {Store} from "@ngrx/store";
import {AppState} from "../../store";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {sidebarAction} from '../../store/ui/actions';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  standalone: true,
  imports: [
    RouterLinkActive,
    NgForOf,
    NgIf,
    NgClass
  ],
  animations: [openCloseAnimation, rotateAnimation]
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem: any = null;
  public isExpandable: boolean = false;
  @HostBinding('class.nav-item') isNavItem: boolean = true;
  @HostBinding('class.menu-open') isMenuExtended: boolean = false;
  public isMainActive: boolean = false;
  public isOneOfChildrenActive: boolean = false;

  constructor(private router: Router, private renderer: Renderer2, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    if (
      this.menuItem &&
      this.menuItem.children &&
      this.menuItem.children.length > 0
    ) {
      this.isExpandable = true;
    }
    this.calculateIsActive(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) this.calculateIsActive(event.url);
      });
  }

  public handleMainMenuAction() {
    if (this.isExpandable) {
      this.toggleMenu();
      return;
    }
    this.menuAction(this.menuItem);
  }

  public toggleMenu() {
    this.isMenuExtended = !this.isMenuExtended;
  }

  menuAction(menu: any) {
    if (window.innerWidth < 992) {
      this.store.dispatch(sidebarAction());
      this.renderer.removeClass(document.querySelector('app-root'), 'sidebar-is-hover');
    }
    if (menu.path) this.router.navigate(menu.path).then();
  }

  public calculateIsActive(url: string) {
    this.isMainActive = false;
    this.isOneOfChildrenActive = false;
    if (this.isExpandable) {
      this.menuItem.children.forEach((item: any) => {
        if (item.path[0] === url) {
          this.isOneOfChildrenActive = true;
          this.isMenuExtended = true;
        }
      });
    } else if (this.menuItem.path[0] === url) {
      this.isMainActive = true;
    }
    if (!this.isMainActive && !this.isOneOfChildrenActive) {
      this.isMenuExtended = false;
    }
  }
}
