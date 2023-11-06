import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { StoreCreateComponent } from './stores/store-create/store-create.component';
import { StoresComponent } from './stores/store/stores.component';
import { StoreEditComponent } from './stores/store-edit/store-edit.component';
import { ProductsComponent } from './Products/products/products.component';
import { CreateProductComponent } from './Products/create-product/create-product.component';
import { ProductEditComponent } from './Products/products-edit/products-edit.component';
import { ColorsComponent } from './Color/color/color.component';
import { CreateColorComponent } from './Color/create-color/create-color.component';
import { ColorEditComponent } from './Color/colors-edit/colors-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomersComponent } from './Customer/customers/customers.component';
import { CustomerCreateComponent } from './Customer/customers-create/customers-create.component';
import { CustomerEditComponent } from './Customer/customers-edit/customers-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    StoreCreateComponent,
    StoresComponent,
    StoreEditComponent,
    ProductsComponent,
    CreateProductComponent,
    ProductEditComponent,
    ColorsComponent,
    CreateColorComponent,
    ColorEditComponent,
    CustomersComponent,
    CustomerCreateComponent,
    CustomerEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
