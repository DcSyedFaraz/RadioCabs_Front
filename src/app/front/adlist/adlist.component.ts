import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-adlist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatSelectModule
  ],
  templateUrl: './adlist.component.html',
  styleUrls: ['./adlist.component.css'],
})
export class AdlistComponent implements OnInit {
  selectedTeam = '';
	onSelected(teams:any) {
		this.selectedTeam = teams;
    console.log('hi');

    console.log(this.selectedTeam);

	}
  dataSource: any;
  registerForm: FormGroup;

  constructor(private service: AdminService, private toastr: ToastrService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      CompanyName: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      telephone: ['', []],
      faxNumber: ['', []],
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

    this.service.createAD(this.registerForm.value).subscribe(
      (a:any) => {
        console.log("Register Data Successfully ", a);
        this.toastr.success(a.message)



      },
      (error:any) => {
        this.toastr.error(error.error.message)
        console.log(error);
        console.log(error.error.message);
        const selectedMembershipType = this.registerForm.value.membershipType;
      console.log('Selected Membership Type:', selectedMembershipType);
      }
    );
    this.registerForm.reset();
    this.gettingdata();
  }

  gettingdata() {
    this.service.getAD()
      .subscribe((data) => {
        console.log(data);

        this.dataSource = data;
      },
        (error) => {
          console.error('Error fetching data:', error);
        })
  }

}
