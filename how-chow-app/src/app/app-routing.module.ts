import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/component/login/login.component';
import { RegisterComponent } from '../app/component/register/register.component';
import { DishListComponent } from '../app/component/dish-list/dish-list.component';
import { DishDisplayComponent } from '../app/component/dish-display/dish-display.component';
import { AboutUsComponent } from './component/about-us/about-us.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/dish-list',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dish-list',
    component: DishListComponent
  },
  {
    path: 'dish-display',
    component: DishDisplayComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
