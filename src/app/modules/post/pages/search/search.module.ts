import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../../../../material.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SearchRoutingModule,
        FlexLayoutModule,
        LayoutModule,
        MaterialModule,
        ImageCropperModule,
        FormsModule
    ],
    exports: [
        SearchRoutingModule
    ],
    declarations: [SearchComponent],
    providers: [],
    bootstrap: [SearchComponent]
})
export class SearchModule { }
