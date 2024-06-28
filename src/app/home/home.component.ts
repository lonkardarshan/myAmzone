import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MainCarouseulComponent } from '../main-carouseul/main-carouseul.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MainCarouseulComponent, ProductListComponent, CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
