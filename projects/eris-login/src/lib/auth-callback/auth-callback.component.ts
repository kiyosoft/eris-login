import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ErisLoginService} from '../eris-login.service';

@Component({
    selector: 'lib-auth-callback',
    templateUrl: './auth-callback.component.html',
    styles: []
})
export class AuthCallbackComponent implements OnInit {

    constructor(private authService: ErisLoginService, private router: Router) {
    }

    ngOnInit(): void {
        this.authService.completeAuthentication().then(() => {
            this.router.navigateByUrl('/');
        });
    }

}
