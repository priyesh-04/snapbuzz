import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userLoggedIn = this._cookieService.get('currentUser');
  private _loginUrl = environment.api_url + 'api/auth/';
  private _registerUrl = environment.api_url + 'api/auth/register/';

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    private _router: Router,
  ) { }

  createHeaders(token?: string) {
    const data = {
      'Content-Type': 'application/json',
    };
    if (token) {
      data['Authorization'] = `JWT ${token}`;
    }
    const httpOptions = {
      headers: new HttpHeaders(data)
    };
    return httpOptions;
  }


  setCurrentUser(user: any, expires?: Date, msg?: string) {
    if (user && user.token) {
      // localStorage.setItem('currentUser', user)
      // localStorage.setItem('token', user.token)
      let expiryDate = null;
      if (expires) {
        expiryDate = expires;
      }
      this._cookieService.set('token', user.token, expiryDate, '/');
      this._cookieService.set('currentUser', user.username, expiryDate, '/');
    }
  }

  checkToken() {
    return this._cookieService.check('token');
  }

  getAuthorizationToken() {
    return this._cookieService.get('token');
  }


  performLogout(msg?: string) {
    this._cookieService.delete('token', '/');
    // localStorage.removeItem('currentUser')
    // localStorage.removeItem('token')
    this._router.navigate(['/login']);
  }


  login(userData): Observable<any> {
    const httpOptions = this.createHeaders();
    return this.http.post(this._loginUrl, userData, httpOptions);
  }

  register(userData: any): Observable<any> {
    const httpOptions = this.createHeaders();
    return this.http.post(this._registerUrl, userData, httpOptions);
  }

}
