import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../../../../material.module';
import { PostEditRoutingModule } from './post-edit-routing.module';
import { PostEditComponent } from './post-edit.component';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PostEditRoutingModule,
        FlexLayoutModule,
        LayoutModule,
        MaterialModule,
        ImageCropperModule,
        FormsModule,
        PickerModule
    ],
    exports: [
        PostEditRoutingModule
    ],
    declarations: [PostEditComponent],
    providers: [],
    bootstrap: [PostEditComponent]
})
export class PostEditModule { }
