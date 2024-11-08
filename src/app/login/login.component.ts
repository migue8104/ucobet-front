import { Component, Injector } from '@angular/core';
import { AuthGoogleService } from '../services/auth-google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private authService: AuthGoogleService;

  constructor(private injector: Injector) {
    this.authService = this.injector.get(AuthGoogleService);
  }


  get isLogged() {
    return this.authService.isAuthenticated();
  }

  signInWithGoogle() {
    this.authService.login();
  }

}
  