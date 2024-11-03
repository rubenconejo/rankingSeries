import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeriesService } from '../../services/series.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-rating',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-rating.component.html',
  styleUrl: './add-rating.component.css'
})
export class AddRatingComponent {
  @Input() serieId!: string; 
  ratingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private seriesService: SeriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.ratingForm = this.fb.group({
      autor: ['', Validators.required],
      puntuacion: [[Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  ngOnInit() {
    this.serieId = this.route.snapshot.paramMap.get('serieId') || '';
    console.log(this.serieId);
    const id = this.route.snapshot.paramMap.get('serieId');
    console.log(id)
    if (!this.serieId) {
      console.error("Error: serieId no está definido en la ruta.");
    }

    // if (this.serieId) {
    //   this.serieId = +this.serieId; // Usa el operador + para convertirlo a número
    // } else {
    //   console.error("Error: serieId no está definido en la ruta.");
    // }
  }

  addRating() {
    if (this.ratingForm.valid) {
      this.seriesService.addRating(this.serieId, this.ratingForm.value).subscribe(() => {
        alert('Valoración añadida exitosamente');
        this.router.navigate(['/series']);
      });
    } else {
      console.error("Error: El formulario es inválido o el ID de la serie no está definido.");
    }
  }
}

