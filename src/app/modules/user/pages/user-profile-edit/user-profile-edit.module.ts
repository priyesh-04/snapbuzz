import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../../../../material.module';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UserProfileEditRoutingModule } from './user-profile-edit-routing.module';
import { UserProfileEditComponent } from './user-profile-edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        UserProfileEditRoutingModule,
        FlexLayoutModule,
        LayoutModule,
        MaterialModule,
        ImageCropperModule,
        FormsModule
    ],
    exports: [
        UserProfileEditRoutingModule
    ],
    declarations: [UserProfileEditComponent, ChangePasswordComponent],
    providers: [],
    bootstrap: [UserProfileEditComponent]
})
export class UserProfileEditModule { }
