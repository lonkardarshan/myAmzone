import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  constructor(private auth: AuthenticationService, private router: Router) { }


  email: string = '';
  password: string = '';


  login() {
    if (this.email && this.password !== '') {
      this.auth.login(this.email).subscribe((user) => {
        if (user.password === this.password) {
          if (this.isBrowser()&& typeof localStorage !== 'undefined') {
            localStorage.setItem('email', this.email)
            if (user.usertype === 'Customer') {
              this.auth.log = true;
              this.router.navigate(['/home']);
            } else if (user.usertype === 'Admin') {
              this.auth.log = true;
              this.router.navigate(['/admin'])
            } else {
              alert("Something went Wong")
            }
          }
        } else if (user.password == null) {
          alert("please enter valid username");
        } else {
          alert("please enter valid password");
        }
      })
    }
    else {
      alert("please enter detail")
    }
  }
}
