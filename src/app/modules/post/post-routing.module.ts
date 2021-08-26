import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


const routes: Routes = [
    {
        path: 'create',
        // loadChildren: './pages/post-create/post-create.module#PostCreateModule',
        loadChildren: () => import('./pages/post-create/post-create.module').then(m => m.PostCreateModule),
        data: { moduleName: 'post-create', preload: true, delay: false },
    },
    {
        path: '',
        // loadChildren: './pages/post-list/post-list.module#PostListModule',
        loadChildren: () => import('./pages/post-list/post-list.module').then(m => m.PostListModule),
        data: { moduleName: 'post-list', preload: true, delay: false },
    },
    {
        path: ':id',
        // loadChildren: './pages/post-detail/post-detail.module#PostDetailModule',
        loadChildren: () => import('./pages/post-detail/post-detail.module').then(m => m.PostDetailModule),
        data: { moduleName: 'post-detail', preload: true, delay: false },
    },
    {
        path: ':id/edit',
        // loadChildren: './pages/post-edit/post-edit.module#PostEditModule',
        loadChildren: () => import('./pages/post-edit/post-edit.module').then(m => m.PostEditModule),
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
