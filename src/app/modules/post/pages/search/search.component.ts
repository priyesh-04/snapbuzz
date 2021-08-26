import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { PostService } from '../../../../services/post/post.service';
import { CommentService } from '../../../../services/comment/comment.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  posts = [];
  user = [];
  commentData = {
    content: ''
  };
  userLoggedIn: string;
  results = [];
  users = [];
  data = {
    search: ''
  };
  searched = false;
  isLoading = false;
  constructor(public _authService: AuthService,
              public _userService: UserService,
              public _cookieService: CookieService,
              public _postService: PostService,
              public _commentService: CommentService) { }

  ngOnInit() {
    this.userLoggedIn = this._authService.userLoggedIn;
  }

  onClick() {
    const elem = (document.querySelector('.search-form') as HTMLInputElement);
    if (elem.focus) {
      this.searched = false;
    }
    this.ngOnInit();
  }

  onSubmit() {
    this.isLoading = true;
    this.searched = true;
    this._userService.getSearch(this.data)
      .subscribe(
        res => {
          this.results = res;
          this.users = this.results.map(d => d.user);
          this.users = Array.from(new Set(this.users.map(i => JSON.stringify(i)))).map(i => JSON.parse(i));

          this.isLoading = false;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
  }

  likePost(id: number) {
    this._postService.postLike(id)
      .subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        err => this.isLoading = false
      );
  }


  bookmarkPost(id: number): void {
    this._postService.postBookmark(id)
      .subscribe(
        res => {}
      );
  }

  updateHashLinks() {
    $(document).ready(function() {
      setTimeout(function() {
        $('.hash').each(function() {
          const hashtagRegex = /(^|\s)#([\w\d-]+)/g;
          const usernameRegex = /(^|\s)@([\w\d-]+)/g;
          const currentHtml = $(this).html();
          let newText;
          newText = currentHtml.replace(hashtagRegex, '$1<a href=\'/tags/$2/\'>#$2</a>');
          newText = newText.replace(usernameRegex, '$1 @<a href=\'/user-profile/$2/\'>$2</a>');
          $(this).html(newText);
        });
      }, 1000);
    });
  }

  createComment(f: NgForm) {
    this.isLoading = true;
    this._commentService.createComment(this.commentData, f.value.model_type, f.value.object_id, f.value.parent_id)
      .subscribe(
        res => {
          this.isLoading = false;
          this.ngOnInit();
          f.resetForm();
        },
        err => this.isLoading = false
      );
  }

}
