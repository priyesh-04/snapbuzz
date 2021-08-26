import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
              private _cookieService: CookieService) { }

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


  getUserDetail(username: string): Observable<any> {
    const _userDetailUrl = `${environment.api_url}api/user/${username}/`;
    const httpOptions = this.createHeaders();
    return this.http.get(_userDetailUrl, httpOptions);
      // .pipe(
      //   map(res => {
      //     let result = res;
      //   }));
    }

  getUserPost(username: string): Observable<any> {
    const _userPostUrl = `${environment.api_url}api/user/${username}/post/`;
    const httpOptions = this.createHeaders();
    return this.http.get(_userPostUrl, httpOptions);
  }

  create(username: string, profile_image): Observable<any> {
    const _uploadProfileImage = `${environment.api_url}api/auth/${username}/edit/profile-pic/`;
    const token = this._cookieService.get('token');
    const headers = new HttpHeaders({ Authorization: 'JWT ' + token, Accept: 'application/json' });
    const uploadData = new FormData();
    uploadData.append('profile_image', profile_image);
    return this.http.put(_uploadProfileImage, uploadData, { headers });
  }

  remove(username: string, profile_image): Observable<any> {
    const _uploadProfileImage = `${environment.api_url}api/auth/${username}/edit/profile-pic/`;
    const token = this._cookieService.get('token');
    const headers = new HttpHeaders({ Authorization: 'JWT ' + token, Accept: 'application/json' });
    return this.http.put(_uploadProfileImage, profile_image, { headers });
  }


  follow(username: string): Observable<any> {
    const _followUrl = `${environment.api_url}api/user/${username}/follow/`;
    const httpOptions = this.createHeaders();
    return this.http.get(_followUrl, httpOptions);
  }


  userEdit(userData, username: string): Observable<any> {
    const _userEditUrl = `${environment.api_url}api/auth/${username}/edit/details/`;
    const httpOptions = this.createHeaders();
    return this.http.put(_userEditUrl, userData, httpOptions);
  }

  changePassword(userData, username: string): Observable<any> {
    const _userEditUrl = `${environment.api_url}api/auth/${username}/password-change/`;
    const httpOptions = this.createHeaders();
    return this.http.put(_userEditUrl, userData, httpOptions);
  }

  getSearch(data): Observable<any> {
    const _SearchUrl = `${environment.api_url}api/post/search/?q=${data.search}`;
    const httpOptions = this.createHeaders();
    return this.http.get(_SearchUrl, httpOptions);
  }

}
