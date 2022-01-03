import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, pipe, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';
// @ts-ignore
import decode from 'jwt-decode';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private getListUser = 'http://localhost:3000/api/v1/users/';
  private getUser = 'http://localhost:3000/api/v1/users/:id';
  private registerUrl = 'http://localhost:3000/api/v1/users/signup';
  private loginUrl = 'http://localhost:3000/api/v1/users/login';

  constructor(private http: HttpClient, private router: Router) {
  }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }
getUserById() {
  return this.http.get<any>(this.getUser);
}
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  getListusers() {
    return this.http.get<any>(this.getListUser);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return localStorage.getItem('token');
  }





}
