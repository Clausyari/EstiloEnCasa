import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,  // Asegúrate de que esto esté presente
  imports: [ReactiveFormsModule, CommonModule] 
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  categoryForm!: FormGroup;  // Formulario para agregar categorías

  constructor(private categoryService: CategoryService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getCategories();
    this.initializeForm();  // Inicializar el formulario
  }

  // Obtener las categorías existentes
  getCategories(): void {
    this.categories = this.categoryService.getCategories();
  }

  // Inicializar el formulario reactivo
  initializeForm(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryTag: ['', Validators.required]
    });
  }

  // Método para agregar una nueva categoría
  addCategory(): void {
    if (this.categoryForm.valid) {
        const newCategory: Category = {
            category_id: this.categories.length > 0 ? this.categories[this.categories.length - 1].category_id + 1 : 1,  // Genera un nuevo ID único
            category: this.categoryForm.get('categoryName')?.value,
            tag: this.categoryForm.get('categoryTag')?.value,
            status: 'Disponible'
        };

        this.categories.push(newCategory);  // Agrega la nueva categoría a la lista
        console.log(this.categories);

        // Mostrar mensaje de éxito usando SweetAlert2
        Swal.fire({
            icon: 'success',
            title: '¡Categoría agregada!',
            text: `La categoría "${newCategory.category}" fue agregada correctamente.`,
            confirmButtonText: 'OK'
        });

        // Reiniciar el formulario y cerrar el modal
        this.categoryForm.reset();
        this.closeModal();
    } else {
        // Si el formulario no es válido, mostrar errores
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos antes de guardar.',
            confirmButtonText: 'OK'
        });
    }
}
  // Método para cerrar el modal
  closeModal(): void {
    setTimeout(() => {
        ($('#categoryModal') as any).modal('hide');
    }, 0);
  }
}