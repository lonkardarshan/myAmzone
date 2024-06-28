import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminnavbarComponent } from '../adminnavbar/adminnavbar.component';
import { AuthenticationService } from '../authentication.service';
import { product, ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminnavbarComponent],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {

  product: product = new product(0, '', '', 0, '', '');
  constructor(
private auth:AuthenticationService,
    private router: Router,
    private productService: ProductServiceService
  ) { }

  ngOnInit() {
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['/login'])
  }
    this.productService.getProductById().subscribe((p) => { this.product = p })
  }

  saveChanges(): void {
    this.productService.saveProductChanges(this.product).subscribe((isupdate) => {
      if (isupdate) {
        this.router.navigate(['/admin'])
        alert("product update successfully");
      } else {
        alert("something went wrong");
      }
    });

  }

}
