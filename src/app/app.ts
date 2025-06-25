import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from "./features/authentication/login/login";

@Component({
  selector: 'app-root',
  imports: [Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'note-taking-app-angular';
}
