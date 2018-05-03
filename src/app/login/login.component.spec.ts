import { AuthService } from './../auth.service';
import { LoginComponent, User } from './login.component';
import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick,
  inject
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;
  let el: DebugElement;
  let submitEl: DebugElement;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthService);
    el = fixture.debugElement.query(By.css('a'));
    submitEl = fixture.debugElement.query(By.css('button'));
    loginEl = fixture.debugElement.query(By.css('input[type=email]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
  });

  it('canLogin return false when the user is not authenticated', done => {
    const spy = spyOn(service, 'isAuthenticated').and.returnValue(
      Promise.resolve(false)
    );
    component.ngOnInit();
    spy.calls.mostRecent().returnValue.then(() => {
      expect(component.needsLogin).toBeTruthy();
      expect(service.isAuthenticated).toHaveBeenCalled();
      done();
    });
  });

  it('canLogin return true when the user is authenticated', async(() => {
    spyOn(service, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.needsLogin).toBeFalsy();
      expect(service.isAuthenticated).toHaveBeenCalled();
    });
  }));

  it(
    'should hide login button when the user is authenticated',
    fakeAsync(() => {
      expect(el.nativeElement.textContent.trim()).toBe('');
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe('Login');
      spyOn(service, 'isAuthenticated').and.returnValue(Promise.resolve(true));
      component.ngOnInit();

      tick();
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe('Logout');
    })
  );

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance', () => {
    inject([AuthService], (injectService: AuthService) => {
      expect(injectService).toBe(service);
    });
  });

  it('Setting enabled to false should disables the submit button', () => {
    component.enabled = false;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });

  it('Should emit event when enter email and password', () => {
    const EMAIL = 'test@mail.com';
    const PASSWORD = 'thisispassword';
    let user: User;
    loginEl.nativeElement.value = EMAIL;
    passwordEl.nativeElement.value = PASSWORD;

    component.loggedIn.subscribe(value => (user = value));

    submitEl.triggerEventHandler('click', null);

    expect(user.email).toBe(EMAIL);
    expect(user.password).toBe(PASSWORD);
  });
});
