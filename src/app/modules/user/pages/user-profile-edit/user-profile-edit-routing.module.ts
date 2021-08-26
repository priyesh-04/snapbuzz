import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileEditComponent } from './user-profile-edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
    {
        path: 'edit',
        component: UserProfileEditComponent
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UserProfileEditRoutingModule { }
