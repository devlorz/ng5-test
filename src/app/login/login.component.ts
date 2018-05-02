import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <a>
      <span *ngIf="needsLogin()" >Login</span>
      <span *ngIf="!needsLogin()" >Logout</span>
    </a>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  needsLogin() {
    return !this.authService.isAuthenticated();
  }
}
