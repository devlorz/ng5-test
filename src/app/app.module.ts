import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DefaultPipe } from './default.pipe';
import { LoginComponent } from './login/login.component';
import { HoverFocusDirective } from './hover-focus.directive';


@NgModule({
  declarations: [
    AppComponent,
    DefaultPipe,
    LoginComponent,
    HoverFocusDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
