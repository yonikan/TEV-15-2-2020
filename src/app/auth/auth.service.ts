import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../core/services/local-storage.service';
import { AuthorizationService } from '../core/services/authorization.service';
import { MatDialog } from '@angular/material';
import { UserLogin } from './user-login.model';
import { ServerEnvService } from '../core/services/server-env.service';
import { LOGIN_DATA } from 'server/data/login.data';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
  private token = null;
  private isAuthenticated = false;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  private userLoginData: UserLogin;
  private userLoginDataListener = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
    private authorizationService: AuthorizationService,
    private dialog: MatDialog,
    private serverEnvService: ServerEnvService
  ) {}

  getToken(): string {
    return this.token;
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  setIsAuth(isAuthenticated) {
    this.isAuthenticated = isAuthenticated;
    this.authStatusListener.next(isAuthenticated);
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  getUserLoginData(): UserLogin {
    return this.userLoginData;
  }

  setUserLoginData(data: UserLogin) {
    this.userLoginData = data;
    this.userLoginDataListener.next(data);
  }

  getUserLoginDataListener(): Observable<UserLogin> {
    return this.userLoginDataListener.asObservable();
  }

  fetchUserLoginData(email: string, password: string): Observable<UserLogin> {
    const BASE_URL = this.serverEnvService.getBaseUrl();
    const API_VERSION = 'v2';
    const USER_DATA = {
      email,
      password
    };
    return this.http.post<any>(`${BASE_URL}/${API_VERSION}/account/login`, USER_DATA);
    // return of(LOGIN_DATA);
  }

  login(email: string, password: string) {
    this.fetchUserLoginData(email, password)
      // .pipe(
      //   tap((loginData: any) => console.log(loginData)),
      // )
      .subscribe(
        (userLoginDataResponse: UserLogin) => {
          if (userLoginDataResponse.token) {
            this.userLoginData = userLoginDataResponse;
            this.userLoginDataListener.next(userLoginDataResponse);
            this.authorizationService.allowedFeatures = userLoginDataResponse.features;
            this.token = userLoginDataResponse.token;
            this.localStorageService.storeOnCookie('token', this.token);
            this.isAuthenticated = true;
			this.authStatusListener.next(true);
			this.router.navigate(['/team-overview']);
          }
        },
        (error) => {
          this.isAuthenticated = false;
          this.authStatusListener.next(false);
        }
      );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['login']);
  }

  postForgotPassword(email: string): Observable<any> {
    const BASE_URL = this.serverEnvService.getBaseUrl();
    const API_VERSION = 'v2';
    const USER_DATA = {
      email
    };
    return this.http.post<any>(`${BASE_URL}/${API_VERSION}/account/forgot-password`, USER_DATA);
  }

  forgotPassword(email: string) {
    this.postForgotPassword(email)
     .subscribe((results: any) => {
        // this.router.navigateByUrl('/login?test=testtttt');
     });
  }

  postResetPassword(password: string, repeatedPassword: string): Observable<any> {
    const BASE_URL = this.serverEnvService.getBaseUrl();
    const API_VERSION = 'v2';
    const USER_DATA = {
      password,
      repeatedPassword
    };
    return this.http.post<any>(`${BASE_URL}/${API_VERSION}/account/reset-password`, USER_DATA);
  }

  resetPassword(password: string, repeatPassword: string) {
    this.postResetPassword(password, repeatPassword)
      .subscribe((results: any) => {

      });
  }

  postSetPassword(token: string, password: string): Observable<any> {
    const BASE_URL = this.serverEnvService.getBaseUrl();
    const API_VERSION = 'v2';
    const USER_DATA = {
      token,
      password
    };
    return this.http.post<any>(`${BASE_URL}/${API_VERSION}/account/set-password`, USER_DATA);
  }

  setPassword(token: string, password: string) {
    this.postSetPassword(token, password)
      .subscribe((results: any) => {

      });
  }
}
