import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  filters = {
    nombre: '',
    valoracionMedia: '',
    orden: ''
  };

  @Output() filterChange = new EventEmitter<any>();

  applyFilters() {
    this.filterChange.emit(this.filters);
  }
}
