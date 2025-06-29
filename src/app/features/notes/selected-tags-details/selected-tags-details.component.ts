import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Note } from '../../../core/models/model';
import * as NoteSelectors from '../../../store/selectors/selectors';
import { NoteItemComponent } from "../note-item/note-item.component";
import { AsyncPipe } from '@angular/common';
import { Nav } from "../../shared/nav/nav";

@Component({
  selector: 'app-selected-tags-details',
  standalone:true,
  templateUrl: './selected-tags-details.component.html',
  styleUrls: ['./selected-tags-details.component.scss'],
  imports: [NoteItemComponent, AsyncPipe, Nav]
})
export class SelectedTagsDetailsComponent implements OnInit {
 
  private route = inject(ActivatedRoute);
  private router = inject(Router)
  private store = inject(Store);
  tagName$!: Observable<string>
  notes$!: Observable<Note[]>;

  ngOnInit(): void {
    this.tagName$ = this.route.paramMap.pipe(
    map(params => params.get('tag')!)
  );

  this.notes$ = this.tagName$.pipe(
    switchMap(tag => this.store.select(NoteSelectors.selectNotesByTagName(tag)))
  );
  }


  goBack():void {
    this.router.navigate(['tags'])
  }
}
