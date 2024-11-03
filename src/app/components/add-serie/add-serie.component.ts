import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeriesService } from '../../services/series.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-add-serie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-serie.component.html',
  styleUrl: './add-serie.component.css'
})
export class AddSerieComponent {

  serieForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private seriesService: SeriesService,
    private router: Router
  ) {
    this.serieForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      plataforma: ['', Validators.required],
      sinopsis: [''],
      imageType: ['url'],
      caratulaUrl: ['', Validators.pattern('(https?:\/\/.*\.(?:png|jpg|jpeg))')],
    });
  }

  onImageTypeChange() {
    // Limpiamos los valores previos de los campos de URL y archivo al cambiar de tipo
    this.serieForm.get('caratulaUrl')?.reset();
    this.imagePreview = null;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Solo procesamos si el archivo es una imagen
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor, selecciona un archivo de imagen.');
      }
    }
  }

  addSerie() {
    if (this.serieForm.valid) {
      const formData = this.serieForm.value;

      // Si el usuario seleccionó URL, enviamos la URL, si es archivo, usamos la vista previa
      const serie = {
        ...formData,
        caratula: formData.imageType === 'url' ? formData.caratulaUrl : this.imagePreview
      };

      this.seriesService.addSerie(serie).subscribe(() => {
        alert('Serie añadida exitosamente');
        this.router.navigate(['/']);
      });
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}

