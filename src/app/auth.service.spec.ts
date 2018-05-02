import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  });

  afterEach(() => {
    service = null;
    localStorage.removeItem('token');
  });

  it('should return true when there is a token', async () => {
    localStorage.setItem('token', '1234');
    const result = await service.isAuthenticated();
    expect(result).toBeTruthy();
  });

  it('should return false when there is no token', async () => {
    const result = await service.isAuthenticated();
    expect(result).toBeFalsy();
  });
});
