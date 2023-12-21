import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-advertisment',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './advertisment.component.html',
  styleUrls: ['./advertisment.component.css'],
})
export class AdvertismentComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'name', 'mobile', 'Designation', 'telephone', 'description', 'actions'];
  dataSource: any;

  constructor(private service: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.gettingdata();
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

  // fetchData(): void {
  //   this.service.getData().subscribe(
  //     (result: any[]) => {
  //       // Assuming the API returns an array similar to ELEMENT_DATA
  //       this.dataSource = result.map(item => ({
  //         position: item.position,
  //         name: item.name,
  //         weight: item.weight,
  //         symbol: item.symbol
  //       }));
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }
}
