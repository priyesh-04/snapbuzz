import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


const routes: Routes = [
    {
        path: 'edit/:id',
        loadChildren: './pages/comment-edit/comment-edit.module#CommentEditModule',
        data: { moduleName: 'comment-edit', preload: true, delay: false },
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class CommentRoutingModule { }
