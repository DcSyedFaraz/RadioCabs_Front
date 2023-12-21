import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'mobile', 'address', 'email','experience', 'description','companyName', 'actions'];
  dataSource: any;

  constructor(private service: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.gettingdata();
  }

  gettingdata() {
    this.service.getDriver()
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

      this.service.deleteDriver(id).subscribe((res: any) => {
        this.toastr.success(res.message)
        console.log(res);

        this.gettingdata();
      })

    }
  }


}
