import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post/post.service';
import { CookieService } from 'ngx-cookie-service';
import { StoriesService } from '../../../../services/stories/stories.service';
import { UserService } from '../../../../services/user/user.service';
import { NgForm } from '@angular/forms';
import { CommentService } from '../../../../services/comment/comment.service';
import { AuthService } from '../../../../services/auth/auth.service';
declare const Zuck;
declare const buildItem;

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts = [];
  user = [];
  recommended = [];
  contentData = {
    caption: ''
  };
  userLoggedIn: string;
  image: File = null;
  commentData = {
    content: ''
  };
  stories: [];
  showStories = true;
  showSuggestions = true;
  isLoading = false;
  isLoaded = false;
  constructor(
              public _authService: AuthService,
              public _postService: PostService,
              public _cookieService: CookieService,
              public _userService: UserService,
              public _storiesService: StoriesService,
              public _commentService: CommentService
            ) { }

  ngOnInit() {
    if (!this.isLoaded) {
      this.isLoading = true;
    }
    this.userLoggedIn = this._authService.userLoggedIn;

    this._postService.getAll()
      .subscribe(
        res => {
          this.posts = res;
          this.updateHashLinks();
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
          this.recommended = res.recommended;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );

    this._storiesService.getAll()
      .subscribe(
        res => {
          this.stories = res;
          console.log(this.stories, 'stories');
          this.isLoading = false;
          this.addstory();
          this.isLoaded = true;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );

  }

  toggleStories() {
    const elem = document.querySelector('#story_id');
    elem.classList.toggle('toggle-story');
    if (this.showStories) {
      (document.querySelector('.toggle-stories-text') as HTMLElement).textContent = "Show Stories";
      this.showStories = false;
    } else {
      (document.querySelector('.toggle-stories-text') as HTMLElement).textContent = "Hide Stories";
      this.showStories = true;
    }
  }

  toggleSuggestions() {
    const elem = document.querySelector('#suggestion_id');
    elem.classList.toggle('toggle-suggestion');
    if (this.showSuggestions) {
      (document.querySelector('.toggle-suggestion-text') as HTMLElement).textContent = "Show Suggestions";
      this.showSuggestions = false;
    } else {
      (document.querySelector('.toggle-suggestion-text') as HTMLElement).textContent = "Hide Suggestions";
      this.showSuggestions = true;
    }
  }

  bookmarkPost(id: number): void {
    this._postService.postBookmark(id)
      .subscribe(
        res => {
          console.log(res, 'Bookmarked or UnBookmarked');
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
        err => console.log(err)
      );
  }

  // randomComment(comments: any, comments_count: number): any {
  //   var num = Math.floor((Math.random() * comments_count) + 1);
  //   if (comments.id === num ) {
  //     return true;
  //   }
  //   else if (comments.id !== num){
  //     return false;
  //   }
  // }

  addstory() {
      const story = [];
      for (let i = 0; i < this.stories.length; i++) {
        const item: any = this.stories[i];
        story.push({
          id: item.user.username,
          photo: item.picture,
          name: item.user.username,
          lastUpdated: 1492665454,
          // seen: false,
          items: [
            buildItem(item.id, 'photo', 3, item.picture, '', '', 1492665454)
          ],
        });
      }
      const stories = new Zuck('stories', {
        backNative: true,
        autoFullScreen: 'false',
        skin: 'snapgram',
        avatars: true,
        list: false,
        cubeEffect: false,
        localStorage: true,

        stories: story
      });
  }


  async fileChangeEvent(evt: any) {
    this.image = evt.target.files[0];
    console.log(evt);
    if (this.image.type !== 'image/jpeg' && this.image.type !== 'image/png') {
      alert('Image type should be either jpg, jpeg, or png');
      return;
    }
    this.createStory();
  }


  createStory() {
    this.isLoading = true;
    this._storiesService.create(this.contentData.caption, this.image)
      .subscribe(
        res => {
          console.log(res, 'Story Created!!!');
          this.isLoading = false;
          this.ngOnInit();
        },
      error => {
        console.log(error);
        this.isLoading = false;
    });
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
    const elem = (document.querySelector('#comment_input_' + f.value.object_id) as HTMLInputElement);
    this.commentData.content = elem.value;
    this._commentService.createComment(this.commentData, f.value.model_type, f.value.object_id, f.value.parent_id)
      .subscribe(
        res => {
          this.ngOnInit();
          console.log(res);
          f.resetForm();
        },
        err => console.log(err)
      );
  }

}
