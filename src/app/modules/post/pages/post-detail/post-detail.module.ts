import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PostDetailComponent } from './post-detail.component';
import { MaterialModule } from '../../../../material.module';
import { PostDetailRoutingModule } from './post-detail-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PostDetailRoutingModule,
        FlexLayoutModule,
        LayoutModule,
        MaterialModule,
        FormsModule
    ],
    exports: [
        PostDetailRoutingModule
    ],
    declarations: [PostDetailComponent],
    providers: [],
    bootstrap: [PostDetailComponent]
})
export class PostDetailModule {}
