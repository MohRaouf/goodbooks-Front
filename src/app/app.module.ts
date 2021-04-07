import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminBoardComponent } from './components/admin-board/admin-board.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule ,NgModel} from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { BookShelfComponent } from './components/book-shelf/book-shelf.component';
// import { AuthModule } from './auth/auth.module';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
// import { RandomGuard } from '../guards/random.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import { AdminGuard } from './guards/admin.guard';
import { AdminBooksComponent } from './components/admin-books/admin-books.component';
import { AdminAuthorsComponent } from './components/admin-authors/admin-authors.component';
import { AdminCategoriesComponent } from './components/admin-categories/admin-categories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './components/user/user.component';
import { HomePublicViewComponent } from './components/home-public-view/home-public-view.component';
import { FooterComponent } from './components/footer/footer.component';
import { PublicBooksComponent } from './components/public-books/public-books.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PopularBooksComponent } from './components/popular-books/popular-books.component';
import { PopularAuthorsComponent } from './components/popular-authors/popular-authors.component';
import { PopularCategoriesComponent } from './components/popular-categories/popular-categories.component';
import { PublicAuthorsComponent } from './components/public-authors/public-authors.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { PublicCategoriesComponent } from './components/public-categories/public-categories.component'; 

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminBoardComponent,
    HomeComponent,
    BookShelfComponent,
    AdminBooksComponent,
    AdminAuthorsComponent,
    AdminCategoriesComponent,
    UserComponent,
    HomePublicViewComponent,
    FooterComponent,
    PublicBooksComponent,
    PopularBooksComponent,
    PopularAuthorsComponent,
    PopularCategoriesComponent,
    PublicAuthorsComponent,
    AuthorDetailsComponent,
    CategoryDetailsComponent,
    BookDetailsComponent,
    PublicCategoriesComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule
    
  ],
  providers: [
    AuthGuard,
    AuthService,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
