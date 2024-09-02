import { Component } from '@angular/core';
import { Product, ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = {
    name: '',
    category: '',
    price: 0,
    description: '',
    imageUrl: ''
  };
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(private productService: ProductService, private storage: AngularFireStorage, private router: Router) {}

 
 onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  if (this.selectedFile) {
    const filePath = `products/${this.selectedFile.name}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedFile);

    task.percentageChanges().subscribe(progress => {
      console.log(`Upload is ${progress}% done`);
    });

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url: string) => {
          this.product.imageUrl = url;
          console.log('File available at', url);
        });
      })
    ).subscribe();
  } else {
    console.error('No file selected');
  }
}

  

onSubmit() {
  if (this.selectedFile ) {
    this.productService.addProduct(this.product, this.selectedFile).then(() => {
      console.log('Product added successfully!');
      alert("Product added successfully");
      this.router.navigate(['/products']);
    }).catch(error => {
      console.error('Error adding product: ', error);
    });
  } else {
    console.error('No file selected');
  }
}

  // async onSubmit() {
  //   if (this.selectedFile) {
  //     try {
  //       const imageUrl = await this.productService.uploadImage(this.selectedFile);
  //       if (imageUrl) {
  //         this.product.imageUrl = imageUrl; // Set the product image URL
  //       } else {
  //         throw new Error('Image URL is undefined');
          
  //       }
  //     } catch (error) {
  //       console.error('Error uploading image: ', error);
  //       return;
  //     }
  //   }

  //   this.productService.addProduct(this.product).then(() => {
  //     console.log('Product added successfully!');
  //     alert("Product added successfully");
  //     this.router.navigate(['/products']);
  //   }).catch(error => {
  //     console.error('Error adding product: ', error);
  //   });
  // }
}
