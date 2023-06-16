import {Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(public oauthService: OAuthService) {
  }

  ngOnInit(): void {
    this.user = this.oauthService.getIdentityClaims();
  }
}
