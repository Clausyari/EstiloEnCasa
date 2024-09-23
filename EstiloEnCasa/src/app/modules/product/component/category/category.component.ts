import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Agrega esta línea
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';

@Component({
    selector: 'app-category',
    standalone: true,  // Marca el componente como standalone
    imports: [CommonModule],  // Asegura que CommonModule esté disponible
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
    categories: Category[] = [];

    constructor(private categoryService: CategoryService) {}

    getCategories(): void {
        this.categories = this.categoryService.getCategories();
        console.log(this.categories);
    }

    ngOnInit(): void {
        this.getCategories();
    }
}
