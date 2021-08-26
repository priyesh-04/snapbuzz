import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HashtagComponent } from './hashtag.component';

const routes: Routes = [
    {
        path: '',
        component: HashtagComponent,
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class HashtagRoutingModule { }
