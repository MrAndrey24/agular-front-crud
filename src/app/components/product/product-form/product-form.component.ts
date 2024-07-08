import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategory, IProduct } from '../../../interfaces';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit{
  @Input() product: IProduct = {};
  @Input() action = '';
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>()
  public categoryService: CategoryService = inject(CategoryService);
  public categories: ICategory[] = [];

  callEvent() {
    this.callParentEvent.emit(this.product);
  }

  ngOnInit() {
    this.loadCategory()
  }

  loadCategory(){
    this.categoryService.getAll()
    this.categories = this.categoryService.items$()
  }
}
