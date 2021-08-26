import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CommentEditComponent } from './comment-edit.component';

const routes: Routes = [
    {
        path: '',
        component: CommentEditComponent,
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class CommentEditRoutingModule { }
