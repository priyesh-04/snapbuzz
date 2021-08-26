import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


const routes: Routes = [
    {
        path: '',
        loadChildren: './login/login.module#LoginModule',
        data: { moduleName: 'login', preload: true, delay: false },
    },
    {
        path: '',
        loadChildren: './register/register.module#RegisterModule',
        data: { moduleName: 'register', preload: true, delay: false },
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
