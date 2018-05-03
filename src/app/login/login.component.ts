import { AuthService } from './../auth.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

export class User {
  constructor(public email: string, public password: string) {}
}

@Component({
  selector: 'app-login',
  template: `
    <a>
      <span *ngIf="needsLogin" >Login</span>
      <span *ngIf="!needsLogin" >Logout</span>
    </a>
    <form>
      <label>Email</label>
      <input type="email"
            #email>
      <label>Password</label>
      <input type="password"
            #password>
      <button type="button"
              (click)="login(email.value, password.value)"
              [disabled]="!enabled">Login
      </button>
    </form>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() enabled = true;
  @Output() loggedIn = new EventEmitter<User>();

  public needsLogin = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated().then((authenticated: boolean) => {
      this.needsLogin = !authenticated;
    });
  }

  login(email, password) {
    if (email && password) {
      this.loggedIn.emit(new User(email, password));
    }
  }
}
