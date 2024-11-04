import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService, Cart, Product } from '../../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<Product[]>; // Change type to Product array

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCartItems();
  }
}
