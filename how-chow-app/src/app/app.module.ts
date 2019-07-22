import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {SuiModule} from 'ng2-semantic-ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DishListComponent } from './component/dish-list/dish-list.component';
import { DishListItemComponent } from './component/dish-list-item/dish-list-item.component';
import { DishDisplayComponent } from './component/dish-display/dish-display.component';
import { ReviewListComponent } from './component/review-list/review-list.component';
import { ReviewListItemComponent } from './component/review-list-item/review-list-item.component';
import { ReviewService } from './service/review.service';
import { FieldErrorAlertComponent } from './component/field-error-alert/field-error-alert.component';
import { UserService } from './service/user.service';
import { DishtagService } from './service/dishtag.service';
import { DishService } from './service/dish.service';
import { EventBrokerService } from './service/ebroker.service';
import { TagService } from './service/tag.service';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { AddDishComponent } from './component/add-dish/add-dish.component';
import { UploadFileService } from './service/upload-file.service';
import { EditTagsComponent } from './component/edit-tags/edit-tags.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DishListComponent,
    DishListItemComponent,
    DishDisplayComponent,
    ReviewListComponent,
    ReviewListItemComponent,
    FieldErrorAlertComponent,
    AboutUsComponent,
    AddDishComponent,
    EditTagsComponent
  ],
  imports: [
    SuiModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DishService,
    DishtagService,
    ReviewService,
    UserService,
    EventBrokerService,
    TagService,
    UploadFileService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
