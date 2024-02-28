import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent} from './home/home.component';
import { CartComponent} from './cart/cart.component';
import { SellerComponent} from './seller/seller.component';
import { RouterModule,Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SellerhomeComponent } from './sellerhome/sellerhome.component';
import { authGuard } from './auth.guard';
import { ProductsComponent } from './products/products.component';
import { ListComponent } from './list/list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {getFirestore}from '@angular/fire/firestore';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyorderComponent } from './myorder/myorder.component';

const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'seller',component:SellerComponent},
  {path:'cart' ,component:CartComponent},
  {path:'sellerhome',component:SellerhomeComponent,canActivate:[authGuard]},
  
  {path:'products',component:ProductsComponent}, 
  {path:'updateproduct/:id',component:UpdateproductComponent}, 
  {path:'search/:name',component:SearchComponent},
  {path:'details/:key/:productid',component:DetailsComponent},
  {path:'user-auth',component:UserAuthenticationComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'myorder',component:MyorderComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CartComponent,
    SellerComponent,
    SellerhomeComponent,
    ProductsComponent,
    ListComponent,
    UpdateproductComponent,
    SearchComponent,
    DetailsComponent,
    UserAuthenticationComponent,
    CheckoutComponent,
    MyorderComponent,
]  ,
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    RouterModule.forRoot(routes),
     FontAwesomeModule,
     NgbModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
