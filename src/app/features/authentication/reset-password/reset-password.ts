import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss'
})
export class ResetPassword {
resetPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder) {
   this.resetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email], ],
    password: ['', [Validators.required]]
  })
  }

  onSubmit():void {
    console.log(this.resetPasswordForm.get('email')?.value)
  }
}
