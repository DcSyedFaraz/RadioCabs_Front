import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-driver',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './createDriver.component.html',
  styleUrls: ['./createDriver.component.css'],
})
export class CreateDriverComponent implements OnInit {



  create: FormGroup;
  constructor(private fb: FormBuilder, private services: AuthService, private service: AdminService, private toastr: ToastrService, private router: ActivatedRoute, private routers: Router) {
    this.create = this.fb.group({
      name: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      telephone: [''],
      email: ['', [Validators.required, Validators.email]],
      description: [''],
      experience: [0]
    });

  }


  ngOnInit(): void { }

  saveChanges(): void {

    console.log(this.create.value);

    this.service.createDriver(this.create.value).subscribe(
      (result: any) => {
        this.toastr.success(result.message);

        const roles = this.services.getUserRoles();
        if (roles.includes('admin')) {

          this.routers.navigate(["admin/driver"]);

        } else if (roles.includes('user')) {

          this.routers.navigate(["user/driver"]);

        } else {

          this.routers.navigate(["company/driver"]);
        }

      },
      (error) => {
        console.error('Error updating driver:', error);

        if (error && error.error && error.error.errors) {
          // Assuming the API returns errors in a structure like { errors: ["error1", "error2", ...] }
          const errorMessages = error.error.errors;

          errorMessages.forEach((errorMessage: any) => {
            this.toastr.error(errorMessage, 'Failed to update driver');
          });
        } else {
          this.toastr.error('Failed to update driver. Please try again.');
        }
      }


    );
  }

}
