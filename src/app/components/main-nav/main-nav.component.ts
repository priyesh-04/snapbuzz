import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
   user = {
    profile_image: '',
    username: '',
    bookmarks: '',
    firstname: '',
    lastname: '',
    followers_count: '',
    following_count: ''
  };
  constructor(public _authService: AuthService,
              public _userService: UserService) {}

  ngOnInit() {
  }
}
