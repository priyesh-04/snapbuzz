import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../../../../material.module';

import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CommentEditRoutingModule } from './comment-edit-routing.module';
import { CommentEditComponent } from './comment-edit.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommentEditRoutingModule,
        FlexLayoutModule,
        LayoutModule,
        MaterialModule,
        ImageCropperModule,
        FormsModule
    ],
    exports: [
        CommentEditRoutingModule
    ],
    declarations: [CommentEditComponent],
    providers: [],
    bootstrap: [CommentEditComponent]
})
export class CommentEditModule { }
