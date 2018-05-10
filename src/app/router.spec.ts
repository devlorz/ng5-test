import { HomeComponent, SearchComponent, AppComponent, routes } from './router';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('Router: App', () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [HomeComponent, SearchComponent, AppComponent]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('navigate to "search" takes you to /search', () => {
    router.navigate(['/search']).then(() => {
      expect(location.path()).toBe('/search');
    });
  });

  it('should redirect to /home when navigate to ""', () => {
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/home');
    });
  });
});
