import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html'
})
export class RequestFormComponent {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    campus: ['', Validators.required],
    workshop: ['']
  });

  constructor(private fb: FormBuilder, private api: ApiService) {}

  onSubmit() {
    this.api.submitRequest(this.form.value).subscribe({
      next: () => alert('Success!'),
      error: (err) => alert('Error: ' + err.message)
    });
  }
}