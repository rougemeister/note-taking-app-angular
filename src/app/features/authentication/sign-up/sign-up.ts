import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})
export class SignUp {

  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) {
   this.signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email], ],
    password: ['', [Validators.required]]
  })
  }

  onSubmit():void {
    console.log(this.signUpForm.get('email')?.value)
  }
}
