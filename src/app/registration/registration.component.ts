import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService, User } from '../authentication.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, NavbarComponent],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private auth: AuthenticationService, private router: Router) { }
  user: User = new User('', '', '', '');
  confirmPassword: string = '';

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    this.auth.register(this.user).subscribe((isRegistered) => {
      if (isRegistered) {
        this.router.navigate(['/login']);
      } else {
        alert('Something went wrong');
      }
    });
  }
}
