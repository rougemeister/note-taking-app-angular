import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setSearchTerm } from 'src/app/store/actions/actions';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm: string = '';

  constructor(private store: Store) {}

  onSearchChange(): void {
    this.store.dispatch(setSearchTerm({ searchTerm: this.searchTerm }));
  }
}
