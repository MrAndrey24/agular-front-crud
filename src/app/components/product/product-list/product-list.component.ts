import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../../interfaces';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ModalComponent, ProductFormComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() itemList: IProduct[] = [];
  public selectedItem: IProduct = {};
  public service: ProductService = inject(ProductService);

  showDetailModal(item: IProduct, modal: any) {
    this.selectedItem = {...item}
    modal.show();
  }

  handleFormAction(item: IProduct) {
    this.service.updateProduct(item);
  }

  deleteProduct(item: IProduct) {
    this.service.deleteProduct(item);
  }

}
