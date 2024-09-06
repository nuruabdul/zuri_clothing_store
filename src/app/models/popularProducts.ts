export interface PopularProduct {
    id: string;
    name: string;
    price: number;
    description?: string;
    category?: string;
    imageUrl: string;
  }
  
  export class SidebarComponent {
    popularProducts: PopularProduct[] = [
      { id: '1', name: 'Product 1', price: 100, imageUrl: 'assets/product1.jpg' },
      { id: '2', name: 'Product 2', price: 150, imageUrl: 'assets/product2.jpg' },
      { id: '3', name: 'Product 3', price: 200, imageUrl: 'assets/product3.jpg' },
      // Add more products as needed
    ];
  }
  