import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminnavbarComponent } from '../adminnavbar/adminnavbar.component';
import { AuthenticationService, User } from '../authentication.service';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [CommonModule,FormsModule,AdminnavbarComponent],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent {
  users: User[] = [];
  constructor(private auth: AuthenticationService,private router:Router) { }
  ngOnInit() {
    this.getAllUser();
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'])
    }
  }
  getAllUser() {
    this.auth.getAllUser().subscribe((user) => this.users = user)
  }
  

  deleteUser(email: string): void {
    this.auth.deleteUser(email).subscribe((isDelete)=>{
      if(isDelete){
        alert(`delete user ${email} successfully`)
        this.router.navigate(['/admin'])
    }else{
      alert("something went wrong")

    }
  })

   
  }
}
