import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
   {
        path: 'login',
        component: LoginComponent
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path: 'logout',
        component: HomeComponent
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
        path: '',
        component: HomeComponent
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
