import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';

import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from '@components/menu-item/menu-item.component';
import {ControlSidebarComponent} from '@modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {uiReducer} from './store/ui/reducer';
import {OAuthModule} from 'angular-oauth2-oidc';
import {OauthComponent} from '@modules/oauth/oauth.component';
import {ProfileComponent} from "@pages/profile/profile.component";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    MenuSidebarComponent,
    BlankComponent,
    DashboardComponent,
    MainMenuComponent,
    SubMenuComponent,
    MenuItemComponent,
    ControlSidebarComponent,
    OauthComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ui: uiReducer}),
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
