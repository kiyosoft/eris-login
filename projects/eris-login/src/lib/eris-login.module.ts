import { NgModule } from '@angular/core';
import { ErisLoginComponent } from './eris-login.component';
import {AuthCallbackComponent} from './auth-callback/auth-callback.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ErisLoginComponent
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  }
];

@NgModule({
  declarations: [ErisLoginComponent, AuthCallbackComponent],
  imports: [
    RouterModule.forRoot(routes),
    RouterModule
  ],
  exports: [ErisLoginComponent, AuthCallbackComponent]
})
export class ErisLoginModule { }
