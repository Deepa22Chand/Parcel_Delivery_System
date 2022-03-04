import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import {  HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ProfileComponent } from './profile/profile.component';
import { ParcelDetailsComponent } from './parcel-details/parcel-details.component';
import { FooterComponent } from './footer/footer.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { VerificationComponent } from './verification/verification.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { SignupAndLoginComponent } from './signup-and-login/signup-and-login.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
  
    ProfileComponent,
    ParcelDetailsComponent,
    FooterComponent,
    CheckoutComponent,
    PaymentComponent,
    VerificationComponent,
    ShipmentComponent,
    SignupAndLoginComponent,
    OrderHistoryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
