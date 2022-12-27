import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loginInfo: any = {};
  loggedIn = false;
  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  login() {
    console.log(this.loginInfo);
    this.accountService.login(this.loginInfo).subscribe(user => {
      this.loggedIn = true;
    });
  }

  logout() {
    this.accountService.logout();
  }
}
