import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'post', pathMatch: 'full'
  },
  {
    path: 'login',
    // loadChildren: './authentication/login/login.module#LoginModule',
    loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    // loadChildren: './authentication/register/register.module#RegisterModule',
    loadChildren: () => import('./authentication/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'post',
    // loadChildren: './modules/post/post.module#PostModule',
    loadChildren: () => import('./modules/post/post.module').then(m => m.PostModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-profile',
    // loadChildren: './modules/user/pages/user-profile/user-profile.module#UserProfileModule',
    loadChildren: () => import('./modules/user/pages/user-profile/user-profile.module').then(m => m.UserProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'accounts',
    // loadChildren: './modules/user/pages/user-profile-edit/user-profile-edit.module#UserProfileEditModule',
    loadChildren: () => import('./modules/user/pages/user-profile-edit/user-profile-edit.module').then(m => m.UserProfileEditModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id/comment',
    // loadChildren: './modules/comment/comment.module#CommentModule',
    loadChildren: () => import('./modules/comment/comment.module').then(m => m.CommentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tags/:$2',
    // loadChildren: './modules/post/pages/hashtag/hashtag.module#HashtagModule',
    loadChildren: () => import('./modules/post/pages/hashtag/hashtag.module').then(m => m.HashtagModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    // loadChildren: './modules/post/pages/search/search.module#SearchModule',
    loadChildren: () => import('./modules/post/pages/search/search.module').then(m => m.SearchModule),
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
