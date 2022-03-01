import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ParcelDetailsComponent } from './parcel-details/parcel-details.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { VerificationComponent } from './verification/verification.component';

const routes: Routes = [
   {
        path: 'login',
        component: LoginComponent
      },{
        path: 'login/register',
        component: RegisterComponent
      },
      {
        path:'verify',
        component: VerificationComponent
      },
      {
        path:'home',
        component:HomeComponent
      },
     
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path:'checkout',
        component:CheckoutComponent
      },
      {
        path:'payment',
        component:PaymentComponent
      },
       {
        path: 'register/login',
        component: LoginComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'parcel-details',
        component:ParcelDetailsComponent
      },
       {
        path:'profile/dashboard',
        component:DashboardComponent
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
