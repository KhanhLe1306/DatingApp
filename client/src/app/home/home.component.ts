import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loginInfo: any = {};
  registerInfo: any = {};
  loggedIn = false;
  showRegisterForm = false;
  @Output() onRegister = new EventEmitter();
  @Input() users: any;
  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  login() {
    console.log(this.loginInfo);
    this.accountService.login(this.loginInfo).subscribe((user) => {
      this.loggedIn = true;
    });
  }

  logout() {
    this.accountService.logout();
  }

  register() {
    console.log('register works!');
    this.onRegister.emit(this.registerInfo);
  }

  toggleRegister() {
    this.showRegisterForm = !this.showRegisterForm;
  }
}
