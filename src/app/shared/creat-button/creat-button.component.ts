import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creat-button',
  standalone: true,
  imports: [],
  templateUrl: './creat-button.component.html',
  styleUrl: './creat-button.component.scss'
})
export class CreatButtonComponent {

  private router = inject(Router)
  


  goToCreatePage():void{
    this.router.navigate(['create'])
  }
}
