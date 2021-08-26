import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../../../../material.module';
import { PostCreateComponent } from './post-create.component';
import { PostCreateRoutingModule } from './post-create-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PostCreateRoutingModule,
        FlexLayoutModule,
        LayoutModule,
        MaterialModule,
        ImageCropperModule,
        FormsModule,
        PickerModule
    ],
    exports: [
        PostCreateRoutingModule
    ],
    declarations: [PostCreateComponent],
    providers: [],
    bootstrap: [PostCreateComponent]
})
export class PostCreateModule { }
