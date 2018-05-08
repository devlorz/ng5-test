import { AuthService } from './../auth.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    <form (ngSubmit)="login()" [formGroup]="form">
      <label>Email</label>
      <input type="email"
            #email>
      <label>Password</label>
      <input type="password"
            #password>
      <button type="submit"
              [disabled]="!enabled">Login
      </button>
    </form>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() enabled = true;
  @Output() loggedIn = new EventEmitter<User>();
  form: FormGroup;

  public needsLogin = true;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.authService.isAuthenticated().then((authenticated: boolean) => {
      this.needsLogin = !authenticated;
    });

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    console.log(`Login ${this.form.value}`);
    if (this.form.valid) {
      this.loggedIn.emit(
        new User(this.form.value.email, this.form.value.password)
      );
    }
  }
}
