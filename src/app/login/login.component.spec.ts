import { AuthService } from './../auth.service';
import { LoginComponent } from './login.component';
import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
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
});
