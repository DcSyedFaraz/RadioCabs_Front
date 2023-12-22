import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatSelectModule
  ],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {

  constructor(private service: AdminService, private toastr: ToastrService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      Name: ['', [Validators.required]],
      MobileNumber: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      Description: ['', [Validators.required]],

    });
  }
  registerForm: FormGroup;

  ngOnInit(): void { }

  onSubmit() {
    console.log('Form submitted:', this.registerForm.value);

    this.service.createfeedback(this.registerForm.value).subscribe(
      (a:any) => {
        this.toastr.success(a.message)
        console.log("Register Data Successfully ", a);

      },
      (error:any) => {
        this.toastr.error(error.error.message)
        console.log(error);
        console.log(error.error.message);
      }
    );
    this.registerForm.reset();
  }

}
