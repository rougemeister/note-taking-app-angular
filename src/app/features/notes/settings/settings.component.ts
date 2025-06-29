import { Component, inject } from '@angular/core';
import { Nav } from "../../shared/nav/nav";
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [Nav],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  private router = inject(Router)


  goToTheme(): void{
    this.router.navigate(['color-theme'])
  }
}
