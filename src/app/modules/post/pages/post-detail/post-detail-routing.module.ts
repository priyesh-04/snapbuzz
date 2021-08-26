import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from './post-detail.component';

const routes: Routes = [
    {
        path: '',
        component: PostDetailComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: []
})
export class PostDetailRoutingModule {}
