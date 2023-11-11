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

const routes: Routes = [
  {
    path: 'stores',
    component: StoresComponent
  },
  {
    path: 'stores/create',
    component: StoreCreateComponent
  },
  {
    path: 'stores/edit/:id', // Adjust the route as needed
    component: StoreEditComponent
  },
  {
    path: 'products', component: ProductsComponent
  },
  {
    path: 'products/create', component: CreateProductComponent
  },
  {
    path: 'products/edit/:id', // Adjust the route as needed
    component: ProductEditComponent
  },
  {
    path: 'colors', // Adjust the route as needed
    component: ColorsComponent
  },
  {
    path: 'colors/create', component: CreateColorComponent
  },
  {
    path: 'colors/edit/:id', component: ColorEditComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'customers/create',
    component: CustomerCreateComponent
  },
  {
    path: 'customers/edit/:id', // Adjust the route as needed
    component: CustomerEditComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
