import {Component, OnInit} from '@angular/core';
import {ErisLoginService} from './eris-login.service';

@Component({
  selector: 'lib-eris-login',
  templateUrl: './eris-login.component.html',
  styleUrls: ['./eris-login.component.css']
})
export class ErisLoginComponent implements OnInit {
  // @ts-ignore
  user: string;

  constructor(private erisLoginService: ErisLoginService) {
    erisLoginService.getUser().subscribe(user => this.user = JSON.stringify(user));
  }

  async login(): Promise<any> {
    await this.erisLoginService.login();
  }

  async logout() {
    await this.erisLoginService.logout();
  }

  async getUser(): Promise<any> {
    try {
      await this.erisLoginService.getUser();
      // const userJson = await this.erisLoginServicee.getUser();
      // this.user = JSON.stringify('From get user ' + userJson);
    } catch (e) {
      console.log(e);
      this.user = e;
    }
  }

  ngOnInit(): void {
  }

}
