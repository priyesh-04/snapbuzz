import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../../../services/post/post.service';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  id: number;
  currentUrl = '';
  contentData = {
    caption: ''
  };
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  isLoading = false;
  @ViewChild(ImageCropperComponent, { static: false }) imageCropper: ImageCropperComponent;
  constructor(
    public _router: Router,
    public _route: ActivatedRoute,
    public _postService: PostService
  ) {
    this.currentUrl = this._router.url;
  }

  ngOnInit() {
    this.isLoading = true;
    this.id = +this._route.snapshot.paramMap.get('id');
    this._postService.getPost(this.id)
      .subscribe(
        data => { for (let i = 0; i < data.length; i++) {
                      const post = data[i];
                      if (this.id === post.id) {
                        this.contentData = {
                          caption: post.caption
                        };
                        this.croppedImage = post.picture;
                      }
                  }
                  this.isLoading = false;
                },
        err => {
          this.isLoading = false;
          if (err.status === 500) {
            alert(err.message);
          }
        }
      );
  }

  toggleEmoji() {
    const elem = document.querySelector('#emojiID');
    elem.classList.toggle('emoji-toggle');
  }

  addEmoji($event) {
    let emoji = $event.emoji.native;
    const elem = (<HTMLInputElement>document.getElementById('post_caption'));
    $('#emojiID').click(function () {
      elem.value = elem.value + emoji;
      emoji = '';
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event);
  }
  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }
  cropperReady() {
    console.log('Cropper ready');
  }
  loadImageFailed() {
    console.log('Load failed');
  }
  rotateLeft() {
    this.imageCropper.rotateLeft();
  }
  rotateRight() {
    this.imageCropper.rotateRight();
  }
  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }
  flipVertical() {
    this.imageCropper.flipVertical();
  }


  editPost() {
    this.isLoading = true;
    this.contentData.caption = (document.querySelector('#post_caption') as HTMLInputElement).value;
    this._postService.postEdit(this.contentData.caption, this.croppedImage, this.id).subscribe(res => {
      this.isLoading = false;
      this._router.navigate(['/post']);
      this.contentData.caption = '';
      this.croppedImage = '';
    }, error => {
      alert('upload new image to update or click cancel to discard changes.');
      this.isLoading = false;
    });
  }

  deletePost() {
    this.isLoading = true;
    this._postService.postDelete(this.id)
      .subscribe(
        res => {
          this.isLoading = false;
          this._router.navigate(['/post']);
        },
        err => this.isLoading = false
      );
  }

}
