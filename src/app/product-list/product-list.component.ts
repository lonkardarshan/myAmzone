import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CartService } from '../cart.service';
import { CartComponent } from '../cart/cart.component';
import { product, ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule,CommonModule,CartComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: product[] = [];
  categories: string[] = [];
  displayedProducts: { [category: string]: product[] } = {};
  batchIndex: { [category: string]: number } = {};
  batchSize: number = 5;
  searchQuery: string = '';

  constructor(
    private cartservice: CartService,
    private auth: AuthenticationService,
    private router: Router,
    private productservice: ProductServiceService
  ) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      localStorage.clear();
    }
    this.productservice.getproduct().subscribe(products => {
      this.products = products;
      this.productservice.setproducts(products);
      this.categories = this.getUniqueCategories();
      this.initializeDisplayedProducts();
    });
  }

  initializeDisplayedProducts() {
    this.categories.forEach(category => {
      this.displayedProducts[category] = [];
      this.batchIndex[category] = 0;
      this.loadNextBatch(category);
    });
  }

  addToCart(product: product,) {

    if (this.auth.isLoggedIn()) {
      this.cartservice.addToCart(product).subscribe(add => {
        if (add) {
          alert("Item added to cart successfully");
        } else {
          alert("Something went wrong on the server");
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  getUniqueCategories(): string[] {
    return [...new Set(this.products.map(product => product.category))];
  }

  loadNextBatch(category: string) {
    const start = this.batchIndex[category] * this.batchSize;
    const end = start + this.batchSize;
    this.displayedProducts[category] = this.products
      .filter(product => product.category === category)
      .slice(start, end);
    this.batchIndex[category]++;
  }

  showLoadMoreButton(category: string): boolean {
    return this.batchIndex[category] * this.batchSize < this.products
      .filter(product => product.category === category).length;
  }

  onSearch() {
    this.displayedProducts = {}; // Clear displayed products to reset the display
    this.categories.forEach(category => {
      this.displayedProducts[category] = this.products
        .filter(product =>
          product.category === category &&
          (product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(this.searchQuery.toLowerCase()))
        );
    });
  }
}
