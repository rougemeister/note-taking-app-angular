import { Component } from '@angular/core';

import { SignUp } from './features/authentication/sign-up/sign-up';
import { ResetPassword } from "./features/authentication/reset-password/reset-password";

@Component({
  selector: 'app-root',
  imports: [ResetPassword],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'note-taking-app-angular';
}
