import { Injectable } from '@angular/core';
import { Category } from '../_model/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor() {}

    getCategories(): Category[] {
        const categories: Category[] = [
            new Category(1, 'Electrodomésticos', 'cocina', 'Disponible'),
            new Category(2, 'Muebles', 'salón', 'Agotado'),
            new Category(3, 'Decoración', 'paredes', 'Disponible'),
            new Category(4, 'Utencilios de cocina', 'cocina', 'Disponible'),
            new Category(5, 'Textiles', 'cama', 'Agotado')
        ];
        return categories;
    }
}
