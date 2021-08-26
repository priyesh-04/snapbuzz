import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


const routes: Routes = [
    {
        path: 'create',
        loadChildren: './pages/post-create/post-create.module#PostCreateModule',
        data: { moduleName: 'post-create', preload: true, delay: false },
    },
    {
        path: '',
        loadChildren: './pages/post-list/post-list.module#PostListModule',
        data: { moduleName: 'post-list', preload: true, delay: false },
    },
    {
        path: ':id',
        loadChildren: './pages/post-detail/post-detail.module#PostDetailModule',
        data: { moduleName: 'post-detail', preload: true, delay: false },
    },
    {
        path: ':id/edit',
        loadChildren: './pages/post-edit/post-edit.module#PostEditModule',
        data: { moduleName: 'post-edit', preload: true, delay: false },
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PostRoutingModule { }
