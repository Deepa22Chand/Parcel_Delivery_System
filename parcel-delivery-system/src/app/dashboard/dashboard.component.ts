import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  quote = "Loading your personal quote"
  email = "Getting your email..."
  
  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.user.getData().subscribe((data: { status: any; quote: string; email: string; }) => {
      if(data.status) {
        this.quote = data.quote
        this.email = data.email
        
      } else {
        this.router.navigate(['logout'])
      }
    })
  }

  updateQuote(event:any) {
    const value = event.target.parentNode.querySelector('#myQuote').value
    this.user.updateQuote(value).subscribe((data: { success: any; }) => {
      if(data.success) {
        alert("Your quote was updated")
      } else {
        alert("Some problem")
      }
    })
  }

}
