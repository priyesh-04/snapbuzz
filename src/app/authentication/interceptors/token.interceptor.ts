import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'; //


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private _cookieService: CookieService, // changed ; to ,
        private router: Router
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // let csrftoken = this.cookieService.get('csrftoken')
        const token = this._cookieService.get('token');
        // let token = localStorage.getItem('token')

        if (token) {
            request = request.clone({
                setHeaders: {
                    // This is where you can use your various tokens
                    Authorization: `JWT ${token}`,
                    // 'X-CSRFToken': `${csrftoken}`
                }
            });
        }

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // console.log(event)
                // do stuff with response if you want
                // console.log("cool it worked!")
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401 || err.status === 403) {
                    const currentUrl = this.router.url;
                    if (currentUrl != '/login') {
                        alert('Session ended. Please login again');
                        this._cookieService.delete('token');
                        this._cookieService.delete('currentUser');
                        // localStorage.removeItem('token')
                        // localStorage.removeItem('currentUser')
                        this.router.navigate(['/login'], { queryParams: { next: currentUrl } });
                    }
                    // /login?next=/status/create
                }
            }
        }));
    }
}
