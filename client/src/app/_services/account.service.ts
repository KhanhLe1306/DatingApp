import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { RegisterUser, User } from '../_models/models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  register(user: any) {
    this.http.post<any>('https://localhost:5001/api/users', user);
  }

  login(user: any): Observable<any> {
    return this.http.post<User>(
      'https://localhost:5001/api/account/login',
      user
    ).pipe(
        map((response: User) => {
          const user = response;   
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
    }))
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getCurrentUser() {
    return !!localStorage.getItem('user');
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  registerUser(user: RegisterUser): Observable<any>{
    return this.http.post<User>('https://localhost:5001/api/account/register', user).pipe(
      map((res: User) => {
        const user = res;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }
}
