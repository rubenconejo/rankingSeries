import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeriesService } from '../../services/series.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
      imageType: ['url'],
      sinopsis: ['', [Validators.required, Validators.maxLength(120)]],
      caratulaUrl: ['',
        [
          Validators.required,
          Validators.pattern('https?://.*\\.(?:png|jpg|jpeg|gif|webp)$')
        ]
      ]
    });
  }

  onImageTypeChange() {
    this.serieForm.get('caratulaUrl')?.reset();
    this.imagePreview = null;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
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
      const serie = {
        ...formData,
        caratula: formData.imageType === 'url' ? formData.caratulaUrl : this.imagePreview
      };

      this.seriesService.addSerie(serie).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}

