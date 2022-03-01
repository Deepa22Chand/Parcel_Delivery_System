import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LogoutComponent } from '../logout/logout.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 
  email = "Getting your email..."
  id="my Id"
  isShown:boolean = false;
  constructor(private user: UserService, private router: Router,private auth:AuthService) { }

  ngOnInit() {
    this.user.getData().subscribe((data: { status: any; ID: any; email: string; }) => {
      if(data.status) {
        this.email = data.email
        this.id=data.ID
        
      } 
    });
  
  }
   logout(){
        this.user.logout().subscribe((data: { success: any; }) => {
      console.log("logout");
      if(data.success) {
        this.auth.setLoggedIn(false)
        this.router.navigate([''])
      } else {
        window.alert('Some problem')
      }
    })
     }


}


