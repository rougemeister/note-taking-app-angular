import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Note } from 'src/app/core/models/model';
import * as NoteSelectors from '../../../store/selectors/selectors';
import * as NoteActions from '../../../store/actions/actions';
import { Nav } from "../../shared/nav/nav";
import { NoteItemComponent } from "../note-item/note-item.component";
import { AsyncPipe } from '@angular/common';
import { TagItemComponent } from "../tag-item/tag-item.component";
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [Nav, AsyncPipe, TagItemComponent, HeaderComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {
archivedNotes$!: Observable<Note[]>;
  allTags$!: Observable<string[]>;
  searchTerm$!: Observable<string>;
  selectedTags$!: Observable<string[]>;

  constructor(private store: Store) {
    this.archivedNotes$ = this.store.select(NoteSelectors.selectArchivedNotes);
    this.allTags$ = this.store.select(NoteSelectors.selectAllTags);
    this.searchTerm$ = this.store.select(NoteSelectors.selectSearchTerm);
    this.selectedTags$ = this.store.select(NoteSelectors.selectSelectedTags);
    
  }

  ngOnInit(): void {
        this.store.dispatch(NoteActions.loadNotes());
  }
}
