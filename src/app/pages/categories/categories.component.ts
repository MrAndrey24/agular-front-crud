import { Component, OnInit, inject } from '@angular/core';
import { CategoryListComponent } from '../../components/category/category-list/category-list.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ICategory } from '../../interfaces';
import { CategoryService } from '../../services/category.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { CategoryFormComponent } from '../../components/category/category-form/category-form.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategoryListComponent, LoaderComponent, ModalComponent, CategoryFormComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent{
  public itemList: ICategory[] = [];
  public service: CategoryService = inject(CategoryService);

  constructor() {
    this.service.getAll();
  }

  handleFormAction(category: ICategory) {
    this.service.save(category);
  }

}
