import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { delay } from 'rxjs';

@Component({
  selector: 'app-companylist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css'],
})
export class CompanylistComponent implements OnInit {
  loading: boolean = true;

  selectedTeam = '';
  onSelected(teams: any) {
    this.selectedTeam = teams;
    console.log('hi');

    console.log(this.selectedTeam);

  }
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
      membershipType: [],
      paymentType: [],
    });
  }

  ngOnInit(): void {
    this.gettingdata();
  }

  onSubmit() {
    console.log('Form submitted:', this.registerForm.value);

    this.service.register(this.registerForm.value).subscribe(
      (a: any) => {
        console.log("Register Data Successfully ", a);
        this.toastr.success(a.message)
        this.loading = false;


      },
      (error: any) => {
        this.toastr.error(error.error.message)
        console.log(error);
        console.log(error.error.message);
        this.loading = false;
      }
    );
    this.registerForm.reset();
    this.gettingdata();
  }

  gettingdata() {
    this.service.frontData()
      .pipe(
        delay(1000) // 1000 milliseconds = 1 second
      ).subscribe((data) => {
        console.log(data);

        this.dataSource = data;
        this.loading = false;
      },
        (error) => {
          console.error('Error fetching data:', error);
          this.loading = false;
        })
  }

  status(event: any, id: any): void {
    console.log(id);

    if (confirm('are you sure?')) {
      event.target.innerText = "Updating...";

      this.service.status(id).subscribe((res: any) => {
        this.toastr.success(res.message)
        console.log(res);

        this.gettingdata();
      })

    }
  }

}
