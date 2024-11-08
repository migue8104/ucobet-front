import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGoogleService } from './services/auth-google.service';
import { map, filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authGoogleService: AuthGoogleService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authGoogleService.isLoggedIn$.pipe(
      filter(isLoggedIn => isLoggedIn !== null),
      take(1),
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
