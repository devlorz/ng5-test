import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <a>
      <span *ngIf="needsLogin" >Login</span>
      <span *ngIf="!needsLogin" >Logout</span>
    </a>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public needsLogin = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated().then((authenticated: boolean) => {
      this.needsLogin = !authenticated;
    });
  }
}
