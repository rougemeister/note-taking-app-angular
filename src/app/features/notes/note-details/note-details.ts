import { Component } from '@angular/core';
import { Nav } from "../../shared/nav/nav";
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { Note } from 'src/app/core/models/model';
import * as NoteSelectors from 'src/app/store/selectors/selectors'
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [Nav, AsyncPipe,CommonModule],
  templateUrl: './note-details.html',
  styleUrl: './note-details.scss'
})
export class NoteDetails {
note$!: Observable<Note | undefined>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {}
 ngOnInit() {
    this.note$ = this.route.paramMap.pipe(
      map(params => params.get('id')!), // 🔁 Change from 'title' to 'id'
      switchMap(id => this.store.select(NoteSelectors.selectNoteById(id)))
    );

    // Debug: Optional logging
    this.note$.subscribe(data => console.log('Note:', data));
  }


}
