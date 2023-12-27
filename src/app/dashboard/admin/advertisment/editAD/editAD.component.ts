import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-ad',
  // standalone: true,

  templateUrl: './editAD.component.html',
  styleUrls: ['./editAD.component.css'],
})
export class EditADComponent implements OnInit {

  constructor(private service: AdminService, private services: AuthService, private toastr: ToastrService, private router: ActivatedRoute, private routers: Router) { }
  AdvertId!: any;
  Advert!: any;

  ngOnInit(): void {
    this.AdvertId = this.router.snapshot.paramMap.get('id');
    // alert(this.companyId);
    this.service.editAD(this.AdvertId).subscribe(res => {
      console.log(res);
      this.Advert = res;
    })
  }

  saveChanges(): void {
    this.service.updateAD(this.AdvertId, this.Advert).subscribe(
      (result:any) => {
        this.toastr.success(result.message);

        const roles = this.services.getUserRoles();
        if (roles.includes('admin')) {

          this.routers.navigate(["admin/advertisment"]);

        } else if (roles.includes('user')) {

          this.routers.navigate(["user"]);

        }

      },
      (error) => {
        console.error('Error updating company:', error);
        this.toastr.error('Failed to update company. Please try again.');
      }
    );
  }
}
