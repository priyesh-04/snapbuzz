import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../../../../material.module';
import { FormsModule } from '@angular/forms';
import { HashtagRoutingModule } from './hashtag-routing.module';
import { HashtagComponent } from './hashtag.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HashtagRoutingModule,
        FlexLayoutModule,
        LayoutModule,
        MaterialModule,
        FormsModule
    ],
    exports: [
        HashtagRoutingModule
    ],
    declarations: [HashtagComponent],
    providers: [],
    bootstrap: [HashtagComponent]
})
export class HashtagModule { }
