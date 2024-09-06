import { Component, Input } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { CartService } from '../../Services/cart.service';
import { Product } from '../../models/product';
// import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
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
  //  pieces: 1 // Initialize pieces to a default value
  selectedQuantities: { [productId: string]: number } = {}; // Use string for productId
  // String for the search input.

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    // private AppComponent:AppComponent,
    private router:Router) {}
//  Injects services needed for data operations and cart management.

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
    this.products = products;
     this.products.forEach(product => {
        this.selectedQuantities[product.id] = 1; // Initialize default quantity to 1 for all products
      });
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

  getQuantityOptions(maxQuantity: number): number[] {
    return Array.from({ length: maxQuantity }, (_, i) => i + 1);
  }
  // Get no.of pcs selected
   addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log(`${product.name} added to cart`);
    alert("Product added to cart!")
  }
  // Adds products to cart and shows a message
  increasePieces(product: Product): void {
    if (product.pieces === undefined) {
      product.pieces = 1;
    }
    if (product.pieces < (product.quantity ?? 0)) {
      product.pieces += 1;
    }
  }
  decreasePieces(product: Product): void {
    if (product.pieces === undefined) {
      product.pieces = 1;
    }
    if (product.pieces > 1) {
      product.pieces -= 1;
    }
  }

  updatePieces(product: Product): void {
    if (product.pieces === undefined) {
      product.pieces = 1;
    }
    if (product.pieces > (product.quantity ?? 0)) {
      product.pieces = product.quantity ?? 0;
    }
  }

  buyProduct(product: Product) {
    this.productService.setSelectedProduct(product);
    this.router.navigate(['/buy'], { state: { selectedProduct: product } });
  

    // this.productService.updateProduct(product.id!, {
    //   ...product,
    //   availableItems: product.availableItems - product.quantity
    // }).then(() => {
    //   alert("Purchase successful!");
    //   this.addToCart(product);
    // }).catch(error => {
    //   console.error("Purchase failed:", error);
    //   alert("Purchase failed. Please try again.");
    // });
  
      // Navigate to the buy product component or pass data
      // Example: Assuming you are navigating to a different route with product data
    
    }
    

    
  }

