import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class PostService {


  private _listView = environment.api_url + 'api/post/';
  private _createPost = environment.api_url + 'api/post/create/';

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
    return this.http.get(this._listView, httpOptions);
  }

  create(caption, picture): Observable<any> {
    const token = this._cookieService.get('token');
    const headers = new HttpHeaders({ Authorization: 'JWT ' + token, Accept: 'application/json' });
    const uploadData = new FormData();
    uploadData.append('caption', caption);
    uploadData.append('picture', picture);
    return this.http.post(this._createPost, uploadData, { headers, withCredentials: true });
  }

  getPost(id: number): Observable<any> {
    const _postDetailUrl = `${this._listView}${id}/`;
    const httpOptions = this.createHeaders();
    return this.http.get(_postDetailUrl, httpOptions);
  }


  postEdit(caption, picture, id: number): Observable<any> {
    const _postEditUrl = `${this._listView}${id}/edit/`;
    const token = this._cookieService.get('token');
    const headers = new HttpHeaders({ Authorization: 'JWT ' + token, Accept: 'application/json' });
    const uploadData = new FormData();
    uploadData.append('caption', caption);
    uploadData.append('picture', picture);
    return this.http.put(_postEditUrl, uploadData, { headers });
  }

  postDelete(id: number): Observable<any> {
    const _postEditUrl = `${this._listView}${id}/edit/`;
    const httpOptions = this.createHeaders();
    return this.http.delete(_postEditUrl, httpOptions);
  }

  postLike(id: number): Observable<any> {
    const _postLikeUrl = `${this._listView}${id}/like/`;
    const httpOptions = this.createHeaders();
    return this.http.get(_postLikeUrl, httpOptions);
  }

  repost(id: number): Observable<any> {
    const _repostUrl = `${this._listView}${id}/repost/`;
    const httpOptions = this.createHeaders();
    return this.http.get(_repostUrl, httpOptions);
  }

  getHashTags(tag: string): Observable<any> {
    const _hashtagUrl = `${environment.api_url}api/tags/${tag}/`;
    const httpOptions = this.createHeaders();
    return this.http.get(_hashtagUrl, httpOptions);
  }

  postBookmark(id: number): Observable<any> {
    const bookamrkUrl = `${environment.api_url}api/user/${id}/bookmark/`;
    const httpOptions = this.createHeaders();
    return this.http.get(bookamrkUrl, httpOptions);
  }

}
