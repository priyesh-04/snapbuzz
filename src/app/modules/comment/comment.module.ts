import { NgModule } from '@angular/core';
import { CommentRoutingModule } from './comment-routing.module';
import { CommentEditComponent } from './pages/comment-edit/comment-edit.component';

@NgModule({
    imports: [
        CommentRoutingModule
    ],
    exports: [
        CommentRoutingModule
    ],
    declarations: [],
})
export class CommentModule {}
