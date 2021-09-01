import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../../../services/post/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import * as $ from 'jquery';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  contentData = {
    caption: ''
  };
  isLoading = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;

  @ViewChild(ImageCropperComponent, {static: false}) imageCropper: ImageCropperComponent;

  constructor(
    public _postService: PostService,
    public _router: Router,
    public _route: ActivatedRoute,
  ) { }
  ngOnInit() {}

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
    // console.log(event);
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


  // async onImageSelect(evt: any) {
  //   this.image = evt.target.files[0];

  //   if (this.image.type !== 'image/jpeg' && this.image.type !== 'image/png') {
  //     alert("Image type should be either jpg, jpeg, or png");
  //     return;
  //   }
  // }


  onSubmit() {
    this.isLoading = true;
    this.contentData.caption = (document.querySelector('#post_caption') as HTMLInputElement).value;
    this._postService.create(this.contentData.caption , this.croppedImage).subscribe(response => {
      this.isLoading = false;
      this._router.navigate(['/post']);
      this.contentData.caption = '';
      this.croppedImage = '';
    }, error => {
    this.isLoading = false;
    });
  }
}
