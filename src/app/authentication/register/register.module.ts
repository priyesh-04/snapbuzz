import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { MaterialModule } from '../../material.module';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        RegisterRoutingModule,
        MaterialModule
    ],
    exports: [
        FormsModule,
        RegisterRoutingModule
    ],
    declarations: [RegisterComponent],
    providers: [],
    bootstrap: [RegisterComponent]
})
export class RegisterModule { }
