import { Component, inject, OnInit } from '@angular/core';
import { Nav } from '../../shared/nav/nav';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Note } from '../../../core/models/model';
import * as NoteSelectors from '../../../store/selectors/selectors';
import * as NoteActions from '../../../store/actions/actions';
import { Store } from '@ngrx/store';
import { AsyncPipe} from '@angular/common';
import { CommonModule } from '@angular/common';
import { NoteItemComponent } from '../note-item/note-item.component';
import { HeaderComponent } from "../../shared/header/header.component";
import { CreatButtonComponent } from "../../../shared/creat-button/creat-button.component";

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [Nav, AsyncPipe, CommonModule, NoteItemComponent, HeaderComponent, CreatButtonComponent],
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
  
    
  }

  ngOnInit(): void {
        this.store.dispatch(NoteActions.loadNotes());
  }
  
}
