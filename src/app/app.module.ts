import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ErisLoginModule} from '../../projects/eris-login/src/lib/eris-login.module';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ErisLoginModule
  ],
  providers: [
    {
      provide: 'authConf', useValue: {
        authority: environment.stsAuthority,
        client_id: environment.clientId,
        redirect_uri: `${environment.clientRoot}auth-callback`,
        authorization_endpoint: `${environment.stsAuthority}/identity/account/login`,
        silent_redirect_uri: `${environment.clientRoot}assets/silent-callback.html`,
        post_logout_redirect_uri: `${environment.clientRoot}`,
        response_type: 'code',
        scope: environment.clientScope
      }
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
