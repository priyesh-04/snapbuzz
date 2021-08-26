import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  private _listStories = environment.api_url + 'api/stories/';
  private _createStories = environment.api_url + 'api/stories/create/';

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

  getAll(): Observable<any> {
    const httpOptions = this.createHeaders();
    return this.http.get(this._listStories, httpOptions);
  }

  create(caption, picture): Observable<any> {
    const token = this._cookieService.get('token');
    const headers = new HttpHeaders({ Authorization: 'JWT ' + token, Accept: 'application/json' });
    const uploadData = new FormData();
    uploadData.append('caption', caption);
    uploadData.append('picture', picture);
    return this.http.post(this._createStories, uploadData, { headers });
  }

}
