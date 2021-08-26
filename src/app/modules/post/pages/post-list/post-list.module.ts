import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostListComponent } from './post-list.component';
import { PostListRoutingModule } from './post-list-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../../../../material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PostListRoutingModule,
        FlexLayoutModule,
        LayoutModule,
        MaterialModule,
        FormsModule
    ],
    exports: [
        PostListRoutingModule
    ],
    declarations: [PostListComponent],
    providers: [],
    bootstrap: [PostListComponent]
})
export class PostListModule {}
