import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from '../../material.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        LoginRoutingModule,
        MaterialModule
    ],
    exports: [
        FormsModule,
        LoginRoutingModule
    ],
    declarations: [LoginComponent],
    providers: [],
    bootstrap: [LoginComponent]
})
export class LoginModule { }
