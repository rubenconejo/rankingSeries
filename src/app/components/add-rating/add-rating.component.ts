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
  @Input() serieId!: number; 
  ratingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private seriesService: SeriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.ratingForm = this.fb.group({
      autor: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  ngOnInit() {
    this.serieId = Number(this.route.snapshot.paramMap.get('serieId'));
    console.log(this.serieId)
  }

  addRating() {
    if (this.ratingForm.valid) {
      this.seriesService.addRating(this.serieId, this.ratingForm.value).subscribe(() => {
        alert('Valoración añadida exitosamente');
        this.router.navigate(['/series']);
      });
    }
  }
}

