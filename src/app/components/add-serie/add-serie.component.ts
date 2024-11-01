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

  constructor(
    private fb: FormBuilder,
    private seriesService: SeriesService,
    private router: Router
  ) {
    this.serieForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      plataforma: ['', Validators.required],
      sinopsis: [''],
      caratula: ['', Validators.required]
    });
  }

  addSerie() {
    if (this.serieForm.valid) {
      this.seriesService.addSerie(this.serieForm.value).subscribe(() => {
        alert('Serie añadida exitosamente');
        this.router.navigate(['/']);
      });
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}

