import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-adminnavbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './adminnavbar.component.html',
  styleUrl: './adminnavbar.component.css'
})
export class AdminnavbarComponent {
constructor(private auth:AuthenticationService,private router:Router){
  if(!this.auth.isLoggedIn()){
    this.router.navigate(['/home'])
  }
 }
  logout() {
    this.auth.logout();
    this.router.navigate(['/home'])
  }
}
