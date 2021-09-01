import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post/post.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../../services/user/user.service';
import { CommentService } from '../../../../services/comment/comment.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
declare const Zuck;
declare const buildItem;

@Component({
  selector: 'app-hashtag',
  templateUrl: './hashtag.component.html',
  styleUrls: ['./hashtag.component.css']
})
export class HashtagComponent implements OnInit {

  posts = [];
  user = [];
  contentData = {
    caption: ''
  };
  userLoggedIn: string;
  image: File = null;
  commentData = {
    content: ''
  };
  tag: string;
  isLoading = false;

  constructor(public _authService: AuthService,
              public _postService: PostService,
              public _cookieService: CookieService,
              public _userService: UserService,
              public _commentService: CommentService,
              public _route: ActivatedRoute,
            ) { }

  ngOnInit() {
    this.userLoggedIn = this._authService.userLoggedIn;
    this.tag = this._route.snapshot.paramMap.get('$2');

    this.isLoading = true;
    this._postService.getHashTags(this.tag)
      .subscribe(
        data => {
          this.posts = data;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );

    this._userService.getUserDetail(this.userLoggedIn)
      .subscribe(
        res => {
          this.user = res;
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
          // console.log(res);
          this.ngOnInit();
        },
        err => console.log(err)

      );
  }

  bookmarkPost(id: number): void {
    this._postService.postBookmark(id)
      .subscribe(
        res => {
          console.log(res, 'Bookmarked or UnBookmarked');
        }
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
    this._commentService.createComment(this.commentData, f.value.model_type, f.value.object_id, f.value.parent_id)
      .subscribe(
        res => {
          this.ngOnInit();
          // console.log(res);
          f.resetForm();
        },
        err => console.log(err)
      );
  }

}
