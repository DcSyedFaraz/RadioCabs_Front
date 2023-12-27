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
  selector: 'app-create-ad',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './createAD.component.html',
  styleUrls: ['./createAD.component.css'],
})
export class CreateADComponent implements OnInit {

  create: FormGroup;
  constructor(private fb: FormBuilder, private services: AuthService, private service: AdminService, private toastr: ToastrService, private router: ActivatedRoute, private routers: Router) {
    this.create = this.fb.group({
      CompanyName: ['', [Validators.required]],
      Designation: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Mobile: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      FaxNumber: [''],
      Email: ['', [Validators.required, Validators.email]],
      Description: [''],
    });

  }

  ngOnInit(): void { }

  saveChanges(): void {

    console.log(this.create.value);

    this.service.createAD(this.create.value).subscribe(
      (result: any) => {
        this.toastr.success(result.message);

        const roles = this.services.getUserRoles();
        if (roles.includes('admin')) {

          this.routers.navigate(["admin/advertisment"]);

        } else if (roles.includes('user')) {

          this.routers.navigate(["user"]);

        } else if (roles.includes('company')) {

          this.routers.navigate(["company/advertisment"]);

        } else if (roles.includes('driver')) {

          this.routers.navigate(["driver/advertisment"]);
        }


      },
      (error) => {
        console.error('Error updating advertisment:', error);

        if (error && error.error && error.error.errors) {
          // Assuming the API returns errors in a structure like { errors: ["error1", "error2", ...] }
          const errorMessages = error.error.errors;

          errorMessages.forEach((errorMessage: any) => {
            this.toastr.error(errorMessage, 'Failed to update advertisment');
          });
        } else {
          this.toastr.error('Failed to update advertisment. Please try again.');
        }
      }


    );
  }

}
