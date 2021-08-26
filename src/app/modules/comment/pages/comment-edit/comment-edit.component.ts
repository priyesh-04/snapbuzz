import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentService } from '../../../../services/comment/comment.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {
  id: number;
  contentData = {
    content: ''
  };
  currentUrl = '';
  isLoading = false;
  constructor(
    public _router: Router,
    public _route: ActivatedRoute,
    public _commentService: CommentService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.id = +this._route.snapshot.paramMap.get('id');
    this.currentUrl = this._router.url;

    this._commentService.getReplies()
      .subscribe(
        data => {
          for (let i = 0; i < data.length; i++) {
            const comment = data[i];
            if (this.id === comment.id) {
              this.contentData = {
                content: comment.content
              };
            }
          }
          this.isLoading = false;
        },
        err => {
          this.isLoading = false;
          console.log(err);
        }
      );
  }

  commentEdit(f: NgForm) {
    this.isLoading = true;
    this._commentService.editComment(this.contentData, this.id)
      .subscribe(
        res => {
          this.isLoading = false;
          this._router.navigate(['/post', this.currentUrl.split('/')[2]]);
        },
        err => {
          this.isLoading = false;
          console.log(err);
        }
      );
  }

  deleteComment() {
    this.isLoading = true;
    this._commentService.commentDelete(this.id)
      .subscribe(
        res => {
          this.isLoading = false;
          this._router.navigate(['/post', this.currentUrl.split('/')[2]]);
        },
        err => {
          this.isLoading = false;
          console.log(err);
        }
      );
  }


}
