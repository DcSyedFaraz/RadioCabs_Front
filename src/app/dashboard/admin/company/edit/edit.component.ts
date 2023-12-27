import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  constructor(private service: AuthService, private toastr: ToastrService, private router: ActivatedRoute, private routers: Router) { }
  companyId!: any;
  company!: any;

  ngOnInit(): void {

    this.companyId =  this.router.snapshot.paramMap.get('id');
    // alert(this.companyId);
    this.service.editData(this.companyId).subscribe(res =>{
      console.log(res);
      this.company = res;

    })
  }

  saveChanges(): void {
    this.service.updateData(this.companyId, this.company).subscribe(
      (result:any) => {
        this.toastr.success(result.message);
        this.routers.navigate(["/admin/company"]);

        const roles = this.service.getUserRoles();
        if (roles.includes('admin')) {

          this.routers.navigate(["admin/company"]);

        } else if (roles.includes('company')) {

          this.routers.navigate(["company"]);

        }
      },
      (error) => {
        console.error('Error updating company:', error);
        this.toastr.error('Failed to update company. Please try again.');
      }
    );
  }

}
