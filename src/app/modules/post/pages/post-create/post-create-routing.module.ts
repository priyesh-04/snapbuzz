import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './post-create.component';

const routes: Routes = [
    {
        path: '',
        component: PostCreateComponent,
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PostCreateRoutingModule { }
