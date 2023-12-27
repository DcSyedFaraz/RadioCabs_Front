import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-driver',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    // MatIconModule,
    FormsModule
  ],
  templateUrl: './editDriver.component.html',
  styleUrls: ['./editDriver.component.css'],
})
export class EditDriverComponent implements OnInit {

  constructor(private service: AdminService, private toastr: ToastrService, private router: ActivatedRoute, private routers: Router, private services: AuthService) { }
  AdvertId!: any;
  Advert!: any;

  ngOnInit(): void {
    this.AdvertId = this.router.snapshot.paramMap.get('id');
    // alert(this.companyId);
    this.service.editDriver(this.AdvertId).subscribe(res => {
      console.log(res);
      this.Advert = res;
    })
  }

  saveChanges(): void {


    this.service.updateDriver(this.AdvertId, this.Advert).subscribe(
      (result:any) => {
        this.toastr.success(result.message);
        // this.routers.navigate(["/admin/driver"]);

        const roles = this.services.getUserRoles();
        if (roles.includes('admin')) {

          this.routers.navigate(["admin/driver"]);

        } else if (roles.includes('driver')) {

          this.routers.navigate(["driver"]);

        }

      },
      (error) => {
        console.error('Error updating company:', error);
        this.toastr.error('Failed to update company. Please try again.');
      }
    );
  }
}
