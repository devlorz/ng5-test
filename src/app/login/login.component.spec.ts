import { AuthService } from './../auth.service';
import { LoginComponent } from './login.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthService);
    el = fixture.debugElement.query(By.css('a'));
  });

  it('canLogin return false when the user is not authenticated', () => {
    spyOn(service, 'isAuthenticated').and.returnValue(false);
    expect(component.needsLogin()).toBeTruthy();
    expect(service.isAuthenticated).toHaveBeenCalled();
  });

  it('canLogin return true when the user is authenticated', () => {
    spyOn(service, 'isAuthenticated').and.returnValue(true);
    expect(component.needsLogin()).toBeFalsy();
    expect(service.isAuthenticated).toHaveBeenCalled();
  });

  it('should hide login button when the user is authenticated', () => {
    expect(el.nativeElement.textContent.trim()).toBe('');
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(service, 'isAuthenticated').and.returnValue(true);
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  });
});
