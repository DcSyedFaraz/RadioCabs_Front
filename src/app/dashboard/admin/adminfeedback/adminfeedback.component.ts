import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-adminfeedback',
  standalone: true,
  imports: [
    MatTableModule, MatIconModule, RouterLink, CommonModule, MatButtonModule
  ],
  templateUrl: './adminfeedback.component.html',
  styleUrls: ['./adminfeedback.component.css'],
})
export class AdminfeedbackComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'name', 'mobile', 'email', 'city', 'type', 'actions'];
  dataSource: any;

  constructor(private service: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.gettingdata();
  }

  gettingdata() {
    this.service.getFeed()
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

      this.service.deleteFeed(id).subscribe((res: any) => {
        this.toastr.success(res.message)
        console.log(res);

        this.gettingdata();
      })

    }
  }

}
