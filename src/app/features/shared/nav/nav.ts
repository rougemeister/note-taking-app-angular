import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  standalone:true,
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav {
  constructor(private router: Router){}



  goHome():void {
    this.router.navigate(['/'])
  }

  goToArchived(): void {
    this.router.navigate(['archived'])
  }

  goToSearchPage(): void {
    this.router.navigate(['search'])
  }

  goToTags(): void {
    this.router.navigate(['tags'])
  }

}
