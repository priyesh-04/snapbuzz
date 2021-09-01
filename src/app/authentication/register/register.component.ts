import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class RegisterComponent implements OnInit {

  userData = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    date_of_birth: '',
    password: '',
    confirm_password: ''
  };
  constructor(
              public _authService: AuthService,
              public _router: Router
            ) { }

  ngOnInit() {
    if (this._authService.checkToken()) {
      alert('To register a new user first logout.');
      this._router.navigate(['/post']);
    }
  }

  registerUser() {
    this.userData.date_of_birth = moment(this.userData.date_of_birth).format("YYYY-MM-DD");
    this._authService.register(this.userData)
      .subscribe(
        res => {
          // console.log(res);
          this._router.navigate(['/login']);
        },
        err => {
          if (err.error.username) {
            alert(err.error.username);
          }
          if (err.error.email) {
            alert(err.error.email);
          }
          console.log(err);
        }
      );
  }

}
