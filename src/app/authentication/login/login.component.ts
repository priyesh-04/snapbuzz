import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginUserData = {
    username: '',
    password: ''
  };
  didLogin = false;


  constructor(
              public _authService: AuthService,
              public _router: Router,
              public _cookieService: CookieService,
              public _route: ActivatedRoute,
              public _userService: UserService
            ) {
  }

  ngOnInit() {
    if (this._authService.checkToken()) {
      alert('You are already Logged In.');
      this._router.navigate(['/post']);
    }
  }

  doLogin(f: NgForm) {
    this._authService.login(this.loginUserData)
      .subscribe(
        data => {
            // let token = data.token
            const date = new Date(data.expires);
            this._authService.setCurrentUser(data, date);
            this.didLogin = true;
            this._authService.userLoggedIn = this._cookieService.get('currentUser');
            const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl');
            this._router.navigate([returnUrl || '/post']);
          },
        err => {
          alert(err.error.detail);
          console.log(err);
        }
      );
  }

}
