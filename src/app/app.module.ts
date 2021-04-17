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
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { AdminGuard } from './guards/admin.guard';
import { AdminBooksComponent } from './components/admin-books/admin-books.component';
import { AdminAuthorsComponent } from './components/admin-authors/admin-authors.component';
import { AdminCategoriesComponent } from './components/admin-categories/admin-categories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePublicViewComponent } from './components/home-public-view/home-public-view.component';
import { FooterComponent } from './components/footer/footer.component';
import { PublicBooksComponent } from './components/public-books/public-books.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PublicCategoriesComponent } from './components/public-categories/public-categories.component';
import { PublicAuthorsComponent } from './components/public-authors/public-authors.component';
import { FooterElementsComponent } from './components/footer-elements/footer-elements.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { RatingAndShelveComponent } from './components/rating-and-shelve/rating-and-shelve.component';
import { PopularBlocksComponent } from './components/popular-books/popular-blocks.component';
import { PopularAuthorsComponent } from './components/popular-authors/popular-authors.component';
import { PopularCategoriesComponent } from './components/popular-categories/popular-categories.component';
import { ErrorComponent } from './components/error/error.component';
import { AboutUsComponent } from './components/footer-elements/aboutUs/about-us/about-us.component'; 
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'; 

 
@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminBoardComponent,
    HomeComponent,
    AdminBooksComponent,
    AdminAuthorsComponent,
    AdminCategoriesComponent,
    HomePublicViewComponent,
    FooterComponent,
    PublicBooksComponent,
    PublicCategoriesComponent,
    PublicAuthorsComponent,
    FooterElementsComponent,
    CategoryDetailsComponent,
    BookDetailsComponent,
    AuthorDetailsComponent,
    RatingAndShelveComponent,
    PopularBlocksComponent,
    PopularAuthorsComponent,
    PopularCategoriesComponent,
    ErrorComponent,
    AboutUsComponent,
    SearchResultsComponent,
    MainNavComponent,
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
    NgxPaginationModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
    
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
