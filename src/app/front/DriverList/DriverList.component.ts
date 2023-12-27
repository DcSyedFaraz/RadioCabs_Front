import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatSelectModule
  ],
  templateUrl: './DriverList.component.html',
  styleUrls: ['./DriverList.component.css'],
})
export class DriverListComponent implements OnInit {
  selectedTeam = '';
  onSelected(teams: any) {
    this.selectedTeam = teams;
    console.log('hi');

    console.log(this.selectedTeam);

  }
  dataSource: any;
  registerForm: FormGroup;

  constructor(private service: AdminService, private toastr: ToastrService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      Experience: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      telephone: ['', []],
      City: ['', []],
      email: ['', [Validators.required, Validators.email]],
      Description: [''],
      paymentType: [Number],
    });
  }

  ngOnInit(): void {
    this.gettingdata();
  }

  onSubmit() {
    console.log('Form submitted:', this.registerForm.value);

    this.service.createDriver(this.registerForm.value).subscribe(
      (a: any) => {
        console.log("Register Data Successfully ", a);
        this.toastr.success(a.message)



      },
      (error: any) => {
        this.toastr.error(error.error.message)
        console.log(error);
        console.log(error.error.message);
      }
    );
    this.registerForm.reset();
    this.gettingdata();
  }

  gettingdata() {
    this.service.frontDriver()
      .subscribe((data) => {
        console.log(data);

        this.dataSource = data;
      },
        (error) => {
          console.error('Error fetching data:', error);
        })
  }

}
