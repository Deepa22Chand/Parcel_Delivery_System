import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 
  email = "Getting your email..."
  id="my Id"
  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.user.getData().subscribe((data: { status: any; ID: any; email: string; }) => {
      if(data.status) {
        this.email = data.email
        this.id=data.ID
        
      } else {
        this.router.navigate(['logout'])
      }
    })
  }



}
