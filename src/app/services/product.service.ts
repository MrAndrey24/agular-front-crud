import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IProduct } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProduct> {
  protected override source: string = 'api/v1/products'
  private itemListSignal = signal<IProduct[]>([])
  private snackBar: MatSnackBar = inject(MatSnackBar);

  get items$ () {
    return this.itemListSignal
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        const products = response.data[0]
        products.reverse()
        this.itemListSignal.set(products)
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
      }
    });
  }

  public addProduct(item: IProduct) {
    this.add(item).subscribe({
      next: (response: any) => {
        this.itemListSignal.update((product: IProduct[]) => [response, ...product])
      },
      error: (error: any) => {
        console.error('response', error.description);
        this.snackBar.open(error.error.description, 'Close' , {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    })
  }

  public updateProduct(item: IProduct) {
    this.edit(item.id, item).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().map(product => product.id === item.id ? item: product)
        this.itemListSignal.set(updatedItems)
      },
      error: (error: any) => {
        console.error('response', error.description);
        this.snackBar.open(error.error.description, 'Close' , {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    })
  }

  public deleteProduct(item: IProduct) {
    this.del(item.id).subscribe({
      next: () => {
        this.itemListSignal.set(this.itemListSignal().filter(product => product.id !== item.id))
      },
      error: (error: any) => {
        console.error('response', error.description);
        this.snackBar.open(error.error.description, 'Close' , {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    })
  }


}
