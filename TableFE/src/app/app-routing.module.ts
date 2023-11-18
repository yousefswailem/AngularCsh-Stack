import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreCreateComponent } from './stores/store-create/store-create.component';
import { StoresComponent } from './stores/store/stores.component';
import { StoreEditComponent } from './stores/store-edit/store-edit.component';
import { ProductsComponent } from './Products/products/products.component';
import { CreateProductComponent } from './Products/create-product/create-product.component';
import { ProductEditComponent } from './Products/products-edit/products-edit.component';
import { ColorsComponent } from './Color/color/color.component';
import { CreateColorComponent } from './Color/create-color/create-color.component';
import { ColorEditComponent } from './Color/colors-edit/colors-edit.component';
import { CustomersComponent } from './Customer/customers/customers.component';
import { CustomerCreateComponent } from './Customer/customers-create/customers-create.component';
import { CustomerEditComponent } from './Customer/customers-edit/customers-edit.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AuthService } from './Authentication Service/auth.service';
import { authGuard } from './guards/auth.guard';

const authService = new AuthService();

const routes: Routes = [
  {
    path: 'stores',
    component: StoresComponent,
    canActivate: [authGuard(authService)],

  },
  {
    path: 'stores/create',
    component: StoreCreateComponent,
    canActivate: [authGuard(authService)],

  },
  {
    path: 'stores/edit/:id', // Adjust the route as needed
    component: StoreEditComponent,
    canActivate: [authGuard(authService)],

  },
  {
    path: 'products', component: ProductsComponent,
    canActivate: [authGuard(authService)],

  },
  {
    path: 'products/create', component: CreateProductComponent,
    canActivate: [authGuard(authService)],

  },
  {
    path: 'products/edit/:id', // Adjust the route as needed
    component: ProductEditComponent,
    canActivate: [authGuard(authService)],

  },
  {
    path: 'colors', // Adjust the route as needed
    component: ColorsComponent,
    canActivate: [authGuard(authService)],

  },
  {
    path: 'colors/create', component: CreateColorComponent,
    canActivate: [authGuard(authService)],


  },
  {
    path: 'colors/edit/:id', component: ColorEditComponent,
    canActivate: [authGuard(authService)],

  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [authGuard(authService)],

  },
  {
    path: 'customers/create',
    component: CustomerCreateComponent,
    canActivate: [authGuard(authService)],

  },
  {
    path: 'customers/edit/:id', // Adjust the route as needed
    component: CustomerEditComponent,
    canActivate: [authGuard(authService)],
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'userslist',
    component: ListUsersComponent,
    canActivate: [authGuard(authService)],
  },
  {
    path: 'userslist/edit/:id',
    component: EditUserComponent,
    canActivate: [authGuard(authService)],

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
