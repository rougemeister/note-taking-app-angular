import { Component, Input } from '@angular/core';
import { Note } from 'src/app/core/models/model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './note-item.component.html',
  styleUrl: './note-item.component.scss'
})
export class NoteItemComponent {
  @Input() noteItem!: Note;
  constructor(private router: Router) {}

  goToDetails(): void {
    this.router.navigate(['/note', this.noteItem.id]);
  }
}
