import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {from, Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ErisLoginService} from './eris-login.service';

@Injectable({
  providedIn: 'root'
})
export class ErisLoginGuard implements CanActivate {
  constructor(private authorize: ErisLoginService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return of(this.authorize.isAuthenticated())
      .pipe(tap(isAuthenticated => this.handleAuthorization(isAuthenticated, state)));
  }

  private handleAuthorization(isAuthenticated: boolean, state: RouterStateSnapshot) {
    if (!isAuthenticated) {
      this.router.navigateByUrl(`login?returnUrl=${state.url}`);
    }
  }
}
