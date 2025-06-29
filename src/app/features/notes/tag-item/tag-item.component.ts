import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tag-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag-item.component.html',
  styleUrl: './tag-item.component.scss'
})
export class TagItemComponent {
    router = inject(Router)
    @Input() tagName!: string;
    @Input() lastElement!: boolean

    
  goToTagsPage(): void {
    this.router.navigate(['tags', this.tagName ])
  }
}
