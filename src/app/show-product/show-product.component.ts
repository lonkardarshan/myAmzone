import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminnavbarComponent } from '../adminnavbar/adminnavbar.component';
import { AuthenticationService } from '../authentication.service';
import { product, ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-show-product',
  standalone: true,
  imports: [FormsModule, CommonModule, AdminnavbarComponent],
  templateUrl: './show-product.component.html',
  styleUrl: './show-product.component.css'
})
export class ShowProductComponent {
  products: product[] = [];
  constructor(private productservice: ProductServiceService, private router: Router, private auth: AuthenticationService) { }
  ngOnInit() {

    this.showAll();
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'])
    }
  }
  showAll() {
    this.productservice.getproduct().subscribe((allproduct) => this.products = allproduct);
  }
  deleteProduct(id: number) {
    this.productservice.deleteProduct(id).subscribe((isdelete) => {
      if (isdelete) {
        alert("item deleted successfully")
        this.router.navigate(['/admin'])
      } else {
        alert("something wrong on server")
      }
    })
  }
  editProduct(id: number) {
    this.productservice.editProduct(id);
    this.router.navigate(['/editproduct'])
  }
}