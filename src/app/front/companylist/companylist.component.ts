import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-companylist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css'],
})
export class CompanylistComponent implements OnInit {
  dataSource: any;
  registerForm: FormGroup;

  constructor(private service: AuthService, private toastr: ToastrService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      telephone: ['', []],
      faxNumber: ['', []],
      email: ['', [Validators.required, Validators.email]],
      membershipType: [0, []],
    });
  }

  ngOnInit(): void {
    this.gettingdata();
  }

  onSubmit() {
    console.log('Form submitted:', this.registerForm.value);

    this.service.register(this.registerForm.value).subscribe(
      (a:any) => {
        console.log("Register Data Successfully ", a);
        this.toastr.success(a.message)

      }
    );
    this.registerForm.reset();
    this.gettingdata();
  }

  gettingdata() {
    this.service.getData()
      .subscribe((data) => {
        console.log(data);

        this.dataSource = data;
      },
        (error) => {
          console.error('Error fetching data:', error);
        })
  }

}
