import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserService } from '../../../../../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userLoggedIn: string;
  passwordData = {
    current_password: '',
    password: '',
    confirm_password: ''
  };
      constructor(public _authService: AuthService,
                  public _userService: UserService,
                  public _cookieService: CookieService,
                  public _router: Router
                ) { }

  ngOnInit() {
    this.userLoggedIn = this._authService.userLoggedIn;
  }

  changePassword() {
    this._userService.changePassword(this.passwordData, this.userLoggedIn)
      .subscribe(
        res => {
          // console.log(res);
          alert('Your Password was changed Successfully.');
          this._router.navigate(['/user-profile', this.userLoggedIn]);
        },
        err => alert(err.error)
      );
  }

}
