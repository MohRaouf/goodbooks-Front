import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminBoardComponent } from './components/admin-board/admin-board.component';
import { HomeComponent }from './components/home/home.component';
import { BookShelfComponent }from './components/book-shelf/book-shelf.component';
import {AuthGuard} from './guards/auth.guard'
import { AdminGuard } from './guards/admin.guard';
import { AdminBooksComponent }from './components/admin-books/admin-books.component';
import { AdminAuthorsComponent }from './components/admin-authors/admin-authors.component';
import { AdminCategoriesComponent }from './components/admin-categories/admin-categories.component';
import { HomePublicViewComponent } from './components/home-public-view/home-public-view.component';
import { PublicBooksComponent } from './components/public-books/public-books.component';
const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path:"home", component:HomeComponent ,children:[
    {
      path:'',
      component:HomePublicViewComponent,
    },{
      path:"books",
      component:PublicBooksComponent,
    }
  ]},
  {
     path: "admin", 
     component: AdminBoardComponent, 
    //  pathMatch: "full", 
     canActivate:[AdminGuard],
     children: [
      {
        path: '', // child route path
        component: AdminBooksComponent,// child route component that the router renders
      },
      {
        path: 'books', // child route path
        component: AdminBooksComponent,// child route component that the router renders
      },
      {
        path: 'authors',
        component: AdminAuthorsComponent // another child route component that the router renders
      },
      {
        path: 'categories',
        component: AdminCategoriesComponent // another child route component that the router renders
      }
    ],

},
  { path: "admins/login", component: AdminLoginComponent, pathMatch: "full",canActivate:[AuthGuard] }
  // { path: "uhome", component: UHomeComponent,canActivate:[ AuthGuard] },
  // { path: "booshelf", component: BookShelfComponent,canActivate:[ AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
