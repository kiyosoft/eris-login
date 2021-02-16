import {Component, OnInit} from '@angular/core';
import {User} from 'oidc-client';
import {ErisLoginService} from '../../../projects/eris-login/src/lib/eris-login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // @ts-ignore
  user: string;

  constructor(private erisLoginService: ErisLoginService) {
    erisLoginService.getUserObservable().subscribe(
      (s: User) => s !== null ? this.user = s.toStorageString() : '',
      error => alert(error));
  }

  ngOnInit(): void {
  }

  async login(): Promise<any> {
    await this.erisLoginService.login();
  }


  async getUser(): Promise<any> {
    try {
      const userJson = await this.erisLoginService.getUser();
      this.user = JSON.stringify(userJson);
    } catch (e) {
      console.log(e);
      this.user = e;
    }
  }

}
