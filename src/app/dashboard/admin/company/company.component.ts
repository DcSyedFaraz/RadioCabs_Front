import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, RouterLink],
})
export class CompanyComponent implements OnInit {
  isAdmin: boolean = false;
  displayedColumns: string[] = ['Id', 'name', 'ContactPerson', 'Designation', 'FaxNumber', 'Email', 'actions'];
  dataSource: PeriodicElement[] = [];

  constructor(private service: AuthService, private toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {
    await this.gettingdata();
    this.checkUserRole();
  }

  checkUserRole(): void {
    const userRole = this.service.getUserRoles();
    if (userRole.includes('admin')) {
      this.isAdmin = true;
    }
  }
  gettingdata() {
    this.service.getData()
      .subscribe((data) => {
        console.log(data);

        this.dataSource = data as PeriodicElement[];
      },
        (error) => {
          console.error('Error fetching data:', error);
        })
  }



  deleteItem(event: any, id: any): void {
    console.log(id);

    if (confirm('are you sure?')) {
      event.target.innerText = "Deleting...";

      this.service.deleteData(id).subscribe((res: any) => {
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

