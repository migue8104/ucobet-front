import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/auth-config';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private oAuthService = inject(OAuthService);
  private http = inject(HttpClient);
  private router = inject(Router);

  private profileSubject = new ReplaySubject<any>(1);
  profile$ = this.profileSubject.asObservable();

  private isLoggedInSubject = new ReplaySubject<boolean | null>(1);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    this.initConfiguration();
  }

  loadUserProfile() {
    const url = "https://www.googleapis.com/oauth2/v2/userinfo";
    return this.http.get(url, {
      headers: { Authorization: `Bearer ${this.accesToken}` }
    }).subscribe(
      profile => {
        this.profileSubject.next(profile);
      },
      error => {
        console.error("Error al cargar el perfil:", error);
      }
    );
  }

  initConfiguration() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      const isLoggedIn = this.oAuthService.hasValidIdToken() && this.oAuthService.hasValidAccessToken();
      this.isLoggedInSubject.next(isLoggedIn);
      if (isLoggedIn) {
        this.loadUserProfile();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    this.isLoggedInSubject.next(false);
    this.profileSubject.next(null);
  }

  get accesToken() {
    return this.oAuthService.getAccessToken();
  }

  get idToken(): string | null {
    return this.oAuthService.getIdToken();
  }
}
