import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterUser, User } from './_models/models';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
    this.getUsers();
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (res) => (this.users = res),
      error: (error) => console.log(error),
      complete: () => console.log('Complete!'),
    });
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

  onRegister(event: RegisterUser) {
    console.log('Eventemmiter works!');
    console.log(event);
    this.accountService.registerUser(event).subscribe({
      next: (res) => console.log('Register successfully with', res),
    });
  }
}
