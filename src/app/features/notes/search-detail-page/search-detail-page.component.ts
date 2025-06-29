import { Component, OnInit } from '@angular/core';
import { Nav } from "../../shared/nav/nav";
import { SearchComponent } from "../../shared/nav/search/search.component";
import { Observable } from 'rxjs';
import { Note } from 'src/app/core/models/model';
import { Store } from '@ngrx/store';
import * as NoteSelectors from '../../../store/selectors/selectors';
import * as NoteActions from '../../../store/actions/actions';
import { NoteItemComponent } from '../note-item/note-item.component';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-search-detail-page',
  standalone: true,
  imports: [Nav, SearchComponent, NoteItemComponent, AsyncPipe],
  templateUrl: './search-detail-page.component.html',
  styleUrl: './search-detail-page.component.scss'
})
export class SearchDetailPageComponent implements OnInit{
   filteredNotes$!: Observable<Note[]>;
   constructor(private store: Store){
        this.filteredNotes$ = this.store.select(NoteSelectors.selectFilteredNotes);
    
   }

    ngOnInit(): void {
           this.store.dispatch(NoteActions.loadNotes());
     }
}
