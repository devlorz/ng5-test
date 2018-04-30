import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {}

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
