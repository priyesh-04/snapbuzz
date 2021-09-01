import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../../services/post/post.service';
import { CommentService } from '../../../../services/comment/comment.service';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  id: number;
  posts = [];
  comments = [];
  commentData = {
    content: ''
  };
  comment_parent_id = '';
  userLoggedIn: string;
  isLoading = false;
  isLoaded = false;
  constructor(public _authService: AuthService,
              public _route: ActivatedRoute,
              public _postService: PostService,
              public _commentService: CommentService,
              public _cookieService: CookieService) { }

  ngOnInit() {
    if (!this.isLoaded) {
      this.isLoading = true;
    }
    this.id = +this._route.snapshot.paramMap.get('id');
    this.userLoggedIn = this._authService.userLoggedIn;

    this._postService.getPost(this.id)
      .subscribe(
        data => {
          this.posts = data;
          this.isLoading = false;
          this.isLoaded = true;
        },
        err => {
          this.isLoading = false;
          if (err.status === 500) {
            alert(err.message);
          }
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

  likeComment(id: number) {
    this._commentService.commentLike(id)
      .subscribe(
        res => {
          this.ngOnInit();
        },
        err => console.log(err)

      );
  }

  bookmarkPost(id: number): void {
    this._postService.postBookmark(id)
      .subscribe(
        res => {
        }
      );
  }

  showReplies(id: number) {
    const elem = document.querySelector('#replies_thread_' + id);
    elem.classList.toggle('replies-thread');
  }

  createComment(f: NgForm) {
    this._commentService.createComment(this.commentData, f.value.model_type, f.value.object_id, this.comment_parent_id)
      .subscribe(
        res => {
          this.ngOnInit();
          // console.log(res);
          this.comment_parent_id = '';
          f.resetForm();
        },
        err => console.log(err)
      );
  }

  commentChangeFocus(username: string, parent_id) {
    const elem = (document.querySelector('.comment_parent_id') as HTMLInputElement);
    const input_elem = (document.querySelector('.comment-input') as HTMLInputElement);
    input_elem.value = '';
    this.comment_parent_id = '';
    this.comment_parent_id = parent_id;
    input_elem.value = '@' + username;
    input_elem.focus();
  }

  replyChangeFocus(username: string, parent_id) {
    const elem = (document.querySelector('.comment_parent_id') as HTMLInputElement);
    const input_elem = (document.querySelector('.comment-input') as HTMLInputElement);
    input_elem.value = '';
    this.comment_parent_id = '';
    this.comment_parent_id = parent_id;
    input_elem.value = '@' + username;
    input_elem.focus();
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

}
