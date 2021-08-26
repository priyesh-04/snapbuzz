import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../../../../material.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        UserProfileRoutingModule,
        FlexLayoutModule,
        LayoutModule,
        MaterialModule
    ],
    exports: [
        UserProfileRoutingModule
    ],
    declarations: [UserProfileComponent],
    providers: [],
    bootstrap: [UserProfileComponent]
})
export class UserProfileModule { }
