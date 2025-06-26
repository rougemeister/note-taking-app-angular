import { Component, OnInit } from '@angular/core';
import { Nav } from '../../shared/nav/nav';
import { Observable } from 'rxjs';
import { Note } from '../../../core/models/model';
import * as NoteSelectors from '../../../store/selectors/selectors';
import * as NoteActions from '../../../store/actions/actions';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [Nav, AsyncPipe, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit{

  filteredNotes$!: Observable<Note[]>;
  allTags$!: Observable<string[]>;
  searchTerm$!: Observable<string>;
  selectedTags$!: Observable<string[]>;

  constructor(private store: Store) {
    this.filteredNotes$ = this.store.select(NoteSelectors.selectFilteredNotes);
    this.allTags$ = this.store.select(NoteSelectors.selectAllTags);
    this.searchTerm$ = this.store.select(NoteSelectors.selectSearchTerm);
    this.selectedTags$ = this.store.select(NoteSelectors.selectSelectedTags);
  }

  ngOnInit(): void {
        this.store.dispatch(NoteActions.loadNotes());
  
  }
  
}
