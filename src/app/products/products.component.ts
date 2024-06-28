import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminnavbarComponent } from '../adminnavbar/adminnavbar.component';
import { AuthenticationService } from '../authentication.service';
import { product, ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,AdminnavbarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router ,private productService: ProductServiceService,private auth:AuthenticationService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['/login'])
    }

  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: product = this.productForm.value;
      this.productService.addproduct(newProduct).subscribe(() => {
          alert('Product added successfully');
          this.productForm.reset();
        },
        (error) => {
          alert('Product with the same name already exists or an error occurred');
        }
      );
    }
  }


}
