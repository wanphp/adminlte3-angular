import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "@/utils/oauth.config";
import {AppState} from "@/store/state";
import {Store} from "@ngrx/store";
import {accessToken, currentUser} from "@/store/auth/actions";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private store: Store<AppState>) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.oauthService.configure(authConfig);
    this.oauthService.setStorage(localStorage);
    if (this.oauthService.hasValidAccessToken()) {
      // 用户已认证，可以访问路由
      this.store.dispatch(new accessToken(this.oauthService.getAccessToken()));
      this.store.dispatch(new currentUser(this.oauthService.getIdentityClaims()));
      this.oauthService.setupAutomaticSilentRefresh();
      return true;
    } else {
      // 用户未认证，重定向到授权端点
      this.oauthService.loadDiscoveryDocumentAndLogin().then();
      // 记录当前url
      localStorage.setItem('currentPath', window.location.toString());
      return false;
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(next, state);
  }
}
