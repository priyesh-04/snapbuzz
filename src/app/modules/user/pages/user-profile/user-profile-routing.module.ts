import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';


const routes: Routes = [
    {
        path: ':username',
        component: UserProfileComponent,
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UserProfileRoutingModule { }
