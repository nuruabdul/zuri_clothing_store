import { Component, Input } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { CartService } from '../../Services/cart.service';
import { Product } from '../../models/product';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() product!: Product;
  // The @Input() decorator allows the component to receive data from a parent component.
  // In this case,addproduct component is the parent

  products: any[] = [];
  // Array to hold product data.
  searchTerm: string = '';
  // String for the search input.

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private AppComponent:AppComponent) {}
//  Injects services needed for data operations and cart management.

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
    this.products = products;
  });
  }
  //  Lifecycle hook that initializes the component by loading product data from the ProductService.

  searchProducts(): void {
    if (this.searchTerm) {
      this.products = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.productService.getProducts().subscribe(data => {
        this.products = data;
      });
    }
  }
  // Filters the product list based on the search term

   addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log(`${product.name} added to cart`);
    alert("Product added to cart!")
  }
  // Adds products to cart and shows a message
  
}