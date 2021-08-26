import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../../services/user/user.service';
import { PostService } from '../../../../services/post/post.service';
import * as $ from 'jquery';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user = {
    profile_image: '',
    username: '',
    bookmarks: '',
    firstname: '',
    lastname: '',
    followers_count: '',
    following_count: ''
  };
  posts = [];
  username: string;
  userLoggedIn: string;
  following_list = [];
  followers_list = [];
  taggedPosts = [];

  image = null;
  isLoading = false;
  isLoaded = false;
  constructor(public _authService: AuthService,
              public _route: ActivatedRoute,
              public _router: Router,
              public _cookieService: CookieService,
              public _userService: UserService,
              public _postService: PostService,
            ) { }
  ngOnInit() {
    if (!this.isLoaded) {
      this.isLoading = true;
    }
    this.username = this._route.snapshot.paramMap.get('username');
    // force route reload whenever params change;
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.userLoggedIn = this._authService.userLoggedIn;
    const getUser = this.username;

    this._userService.getUserDetail(this.userLoggedIn)
      .subscribe(
        res => {
          this.following_list = res.following_list;
          this.followers_list = res.followers_list;

          const loggedInUserFollowing = this.following_list.map(d => d.username);

          $(document).ready(function() {

            let btn = 'Follow';
            for (let j = 0; j < loggedInUserFollowing.length; j++) {
              if ((getUser === loggedInUserFollowing[j])) {
                btn = 'Unfollow';
              }
            }
            $('.btn-follow').text(btn);
          });
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );

    this._postService.getHashTags(this.username)
      .subscribe(
        res => {
          this.taggedPosts = res;
          console.log(res, 'taggedPosts');
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );


    this._userService.getUserDetail(this.username)
      .subscribe(
        res => {
            this.user = res;
            console.log(this.user, 'user');
            this.following_list = res.following_list;
            this.followers_list = res.followers_list;
            const weFollow = this.following_list.map(d => d.username);

            $(document).ready(function() {

              $('.checkuser li').each(function() {

                let btn = 'Follow';
                for (let j = 0; j < weFollow.length; j++) {
                  if (($(this).closest('li').children('a').children('.username').text()).replace('@', '').trim() === weFollow[j]) {
                    btn = 'Unfollow';
                  }

                }
                $(this).closest('li').children('.follow-btn').text(btn);
              });
            });

        },
        err => {
          console.log(err);
          this.isLoading = false;
          if (err.error.detail === 'Not found.') {
            this._router.navigate(['page-not-found'])
          }
        }
      );

    this._userService.getUserPost(this.username)
        .subscribe(
          res => {
            this.posts = res;
            this.isLoading = false;
            this.isLoaded = true;
          },
          err => {
            console.log(err);
            this.isLoading = false;
          }
        );
  }

  follow(username: string) {
    this._userService.follow(username)
      .subscribe(
        res => {
          this.ngOnInit();
          console.log(res, 'followed or unfollowed');
        },
        err => {
          console.log(err);
        }
      );
  }

  async onImageSelect(evt: any) {
    this.image = evt.target.files[0];
    if (this.image.type !== 'image/jpeg' && this.image.type !== 'image/png') {
      alert('Image type should be either jpg, jpeg, or png');
      return;
    }
    this.uploadProfilePic();
  }

  uploadProfilePic() {
    this.isLoading = true;
    this._userService.create(this.userLoggedIn, this.image).subscribe(response => {
      this.ngOnInit();
      this.image = null;
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }

  removePhoto() {
    this.isLoading = true;
    const image = null;
    this._userService.remove(this.userLoggedIn, image)
      .subscribe(
        res => {
          this.ngOnInit();
          this.isLoading = false;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
  }

}
