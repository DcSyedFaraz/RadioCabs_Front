import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-advertisment',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, CommonModule, MatButtonModule],
  templateUrl: './advertisment.component.html',
  styleUrls: ['./advertisment.component.css'],
})
export class AdvertismentComponent implements OnInit {
  isAdmin: boolean = false;
  displayedColumns: string[] = ['Id', 'name', 'mobile', 'Designation', 'telephone', 'description', 'Company', 'actions'];
  dataSource: any;

  constructor(private service: AdminService, private toastr: ToastrService, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    await this.gettingdata();
    this.checkUserRole();
  }

  checkUserRole(): void {
    const userRole = this.authService.getUserRoles();
    if (userRole.includes('admin')) {
      this.isAdmin = true;
    }
  }

  gettingdata() {
    this.service.getAD()
      .subscribe((data) => {

        this.dataSource = data;
        console.log(this.dataSource);
      },
        (error) => {
          console.error('Error fetching data:', error);
        })
  }



  deleteItem(event: any, id: any): void {
    console.log(id);

    if (confirm('are you sure?')) {
      event.target.innerText = "Deleting...";

      this.service.deleteAD(id).subscribe((res: any) => {
        this.toastr.success(res.message)
        console.log(res);

        this.gettingdata();
      })

    }
  }


}
