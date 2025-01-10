import {Routes} from '@angular/router';
import {MainComponent} from './modules/main/main.component';
import {AuthGuard} from './guards/auth.guard';
import {ProfileComponent} from './pages/profile/profile.component';
import {BlankComponent} from './pages/blank/blank.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {OauthComponent} from './modules/oauth/oauth.component';
import {NonAuthGuard} from './guards/non-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'blank',
        component: BlankComponent
      },
      {
        path: 'sub-menu-1',
        component: SubMenuComponent
      },
      {
        path: 'sub-menu-2',
        component: BlankComponent
      },
      {
        path: '',
        component: DashboardComponent
      }
    ]
  },
  {
    path: 'oauth',
    component: OauthComponent,
    canActivate: [NonAuthGuard]
  },
  {path: '**', redirectTo: ''}
];
