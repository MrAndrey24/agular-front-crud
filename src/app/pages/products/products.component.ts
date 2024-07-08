import { Component, inject } from '@angular/core';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { IProduct } from '../../interfaces';
import { ProductService } from '../../services/product.service';
import { ProductFormComponent } from '../../components/product/product-form/product-form.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductListComponent, ProductFormComponent , LoaderComponent, ModalComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public itemList: IProduct[] = [];
  public service: ProductService = inject(ProductService);

  constructor() {
    this.service.getAll();
  }

  handleFormAction(product: IProduct) {
    this.service.addProduct(product);
  }

}
