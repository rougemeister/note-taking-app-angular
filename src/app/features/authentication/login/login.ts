import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {
   this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email], ],
    password: ['', [Validators.required]]
  })
  }

  onSubmit():void {
    console.log(this.loginForm.get('email')?.value)
  }

 


  
}
