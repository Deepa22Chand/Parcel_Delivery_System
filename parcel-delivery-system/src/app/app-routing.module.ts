import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

import { ParcelDetailsComponent } from './parcel-details/parcel-details.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';

import { ShipmentComponent } from './shipment/shipment.component';
import { SignupAndLoginComponent } from './signup-and-login/signup-and-login.component';
import { VerificationComponent } from './verification/verification.component';

const routes: Routes = [
   {
      
        path:'verify',
        component: VerificationComponent
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'signup_and_login',
        component:SignupAndLoginComponent
      },
     
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'checkout',
        component:CheckoutComponent
      },
      {
        path:'shipment',
        component:ShipmentComponent
      },
      {
        path:'payment',
        component:PaymentComponent
      },
      
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'parcel-details',
        component:ParcelDetailsComponent,
        canActivate: [AuthGuard]
      },
       {
        path:'profile/dashboard',
        component:DashboardComponent
      },{
        path:'order-history',
        component:OrderHistoryComponent
      },
      {
        path: '',
        component: HomeComponent
      },
      {
        path: '**',
        component:HomeComponent
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
   providers:[
        AuthGuard
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
