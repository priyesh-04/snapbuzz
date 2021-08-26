import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private _listComments = environment.api_url + 'api/comment/';
  private _createComment = environment.api_url + 'api/comment/create/';

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


  createComment(commentData, type, id, parent_id): Observable<any> {
    const _createCommentUrl = `${this._createComment}?type=${type}&id=${id}&parent_id=${parent_id}`;
    const httpOptions = this.createHeaders();
    return this.http.post(_createCommentUrl, commentData, httpOptions);
  }

  editComment(commentData, id: number): Observable<any> {
    const _commentEditUrl = `${this._listComments}${id}/`;
    const httpOptions = this.createHeaders();
    return this.http.put(_commentEditUrl, commentData, httpOptions);
  }

  getReplies(): Observable<any> {
    const _commentListUrl = `${ this._listComments }`;
    const httpOptions = this.createHeaders();
    return this.http.get(_commentListUrl, httpOptions);
  }

  commentDelete(id: number): Observable<any> {
    const _commentDeleteUrl = `${this._listComments}${id}/`;
    const httpOptions = this.createHeaders();
    return this.http.delete(_commentDeleteUrl, httpOptions);
  }

  commentLike(id: number): Observable<any> {
    const _commentLikeUrl = `${this._listComments}${id}/like/`;
    const httpOptions = this.createHeaders();
    return this.http.get(_commentLikeUrl, httpOptions);
  }
}
