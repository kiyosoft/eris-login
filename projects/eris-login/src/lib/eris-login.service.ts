import {Inject, Injectable} from '@angular/core';
import {User, UserManager, WebStorageStateStore} from 'oidc-client';
import {BehaviorSubject, concat, from, Observable} from 'rxjs';
import {AuthConf} from './auth_conf';
import {Router} from '@angular/router';
import {filter, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErisLoginService {
  userManager: UserManager;
  // @ts-ignore
  private dataSource: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(@Inject('authConf') authConf: AuthConf, router: Router) {
    const settings = {
      authority: authConf.authority,
      client_id: authConf.client_id,
      redirect_uri: authConf.redirect_uri,
      silent_redirect_uri: authConf.silent_redirect_uri,
      post_logout_redirect_uri: authConf.post_logout_redirect_uri,
      response_type: authConf.response_type,
      scope: authConf.scope,
      userStore: new WebStorageStateStore({store: window.localStorage})
    };
    this.userManager = new UserManager(settings);

    this.userManager.events.addUserSignedOut(async () => {
      await this.userManager.removeUser();
      this.dataSource.next(null);
    });

    this.userManager.events.addUserLoaded(async () => {
      this.getUser();
    });

    this.userManager.events.addUserSignedIn(async () => {
      this.getUser();
    });
  }

  public getUser(): Observable<User | null> {
    return concat(
      this.dataSource.pipe(take(1), filter(u => !!u)),
      this.getUserFromStorage().pipe(filter(u => !!u), tap(u => {
        console.log('From storage');
        if (u instanceof User) {
          this.dataSource.next(u);
        } else {
          this.dataSource.error('No user object');
        }
      })),
      this.dataSource.asObservable()
    );
  }

  getToken(): string {
    return this.dataSource.value.access_token;
  }

  isTokenExpired(): boolean {
    return this.dataSource.value.expired;
  }

  isAuthenticated(): boolean {
    return this.dataSource.value.access_token != null && !this.dataSource.value.expired;
  }

  getUserObservable(): Observable<User> {
    return this.dataSource.asObservable();
  }

  cleanUp(): void {
    this.userManager.events.removeUserSignedIn((callback: void) => {
    });
    this.userManager.events.removeUserSignedOut((callback: void) => {
    });
  }

  // public getUser(): void {
  //   this.userManager.getUser().then(user => {
  //     if (user instanceof User) {
  //       this.dataSource.next(user);
  //     } else {
  //       this.dataSource.error('Login required');
  //     }
  //   }).catch(err => this.dataSource.error(err));
  // }

  completeAuthentication(): Promise<void> {
    return this.userManager.signinRedirectCallback().then(user => {
      this.dataSource.next(user);
    });
  }

  public login(): Promise<void> {
    // return this.userManager.signinRedirectCallback().then(user => this.dataSource.next(user));
    return this.userManager.signinRedirect();
  }

  public renewToken(): void {
    console.log('Called');
    this.userManager.signinSilent().then(user => {
      console.log(user);
      this.dataSource.next(user);
    }).catch(err => {
      console.log(err);
      this.dataSource.error(err);
    });
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  private getUserFromStorage(): Observable<User | null> {
    return from(this.userManager.getUser());
  }

}
