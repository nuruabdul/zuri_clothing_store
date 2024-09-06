export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    category?: string;
    imageUrl: string;
    quantity?: number; 
    availableItems?: number; 
    pieces?:number ;
    location?: string;  // Location where the product is to be delivered
    paymentMethod?: 'MPESA' | 'CreditCard'; 
  }