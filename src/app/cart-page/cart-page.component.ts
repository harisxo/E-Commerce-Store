import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData!: cart[];
  priceSummary: priceSummary = {
    total: 0,
    price: 0,
  };
  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }

 

  removeToCart(cartId: number | undefined) {
    cartId && this.cartData &&
      this.product.removeToCart(cartId).subscribe((result) => {
        this.loadDetails();
      });
  }

  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.warn(this.cartData);
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.priceSummary.price = price;

      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }
    });
  }
  checkout() {
    this.router.navigate(['/checkout']);
  }
}
