import { Component, inject } from '@angular/core';
import { Nav } from "../../shared/nav/nav";
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { Note } from 'src/app/core/models/model';
import * as NoteSelectors from 'src/app/store/selectors/selectors'
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import *  as NoteActions from 'src/app/store/actions/actions'

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [Nav, AsyncPipe,CommonModule],
  templateUrl: './note-details.html',
  styleUrl: './note-details.scss'
})
export class NoteDetails {
note$!: Observable<Note | undefined>;
router = inject(Router)

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {}
 ngOnInit() {
    this.note$ = this.route.paramMap.pipe(
      map(params => params.get('id')!),
      switchMap(id => this.store.select(NoteSelectors.selectNoteById(id)))
    );



  }
  archiveNote(note: Note): void {
  this.store.dispatch(NoteActions.archiveNote({
    id: note.id,
    isArchived: !note.isArchived
  }));
  // this.goBack()
  console.log('done')
}


 deleteNote(): void {
  this.note$.subscribe(note => {
    if (note?.id) {
      this.store.dispatch(NoteActions.deleteNote({ id: note.id }));
      this.goBack(); 
    }
  });
}

  goBack():void {
    this.router.navigate(['/'])
  }


}
