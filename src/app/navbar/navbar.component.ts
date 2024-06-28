import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CartService } from '../cart.service';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private auth: AuthenticationService, private router: Router,private cartservice:CartService) { }
  email: any;
  isLoggedIn: boolean = false;
  ngOnInit() {
    if(typeof localStorage !== 'undefined'){
      this.email = localStorage.getItem('email')
    }
    this.cartservice.setemail(this.email);
    this.logged();
    console.log(this.auth.isLoggedIn())
  }


  logged() {
    if (this.auth.isLoggedIn()) {

      this.isLoggedIn = true;
    } else {
      localStorage.clear();
      this.isLoggedIn = false;
    }
  }
  login() {

    this.router.navigate(['/login'])
  }
  logout() {
    this.isLoggedIn = this.auth.logout();
    localStorage.clear;
    this.router.navigate(['/home'])
  }
}
