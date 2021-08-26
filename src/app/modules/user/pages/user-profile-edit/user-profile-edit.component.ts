import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../../services/user/user.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {

  userLoggedIn: string;
  userData = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    date_of_birth: ''
  };
  user = [];
  isLoading = false;
  constructor(public _authService: AuthService,
              public _router: Router,
              public _route: ActivatedRoute,
              public _cookieService: CookieService,
              public _userService: UserService,
            ) { }

  ngOnInit() {
    this.isLoading = true;
    // this.username = this._route.snapshot.paramMap.get('username')
    this.userLoggedIn = this._authService.userLoggedIn;

    this._userService.getUserDetail(this.userLoggedIn)
      .subscribe(
        res => {
          this.user = res;
          this.userData = {
            firstname: res.firstname,
            lastname: res.lastname,
            username: res.username,
            email: res.email,
            date_of_birth: res.date_of_birth,
          };
          this.isLoading = false;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        });
  }

  editUser() {
    this.isLoading = true;
    this._userService.userEdit(this.userData, this.userLoggedIn)
      .subscribe(
        res => {
          this.isLoading = false;
          alert('Your Profile Details Updated Successfully.');
          this._router.navigate(['/user-profile', this.userLoggedIn]);
        },
        err => {
          console.log(err.error);
          this.isLoading = false;
        }
      );
  }

}
