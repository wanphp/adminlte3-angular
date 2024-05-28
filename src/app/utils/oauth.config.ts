import {AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://www.ztit.cn',
  tokenEndpoint: 'https://www.ztit.cn/auth/accessToken',
  userinfoEndpoint: 'https://www.ztit.cn/api/userProfile',
  clientId: 'testClient',
  redirectUri: window.location.origin + '/adminlte4-angular/oauth',
  responseType: 'code',
  requireHttps: true,
  skipSubjectCheck: true
};
