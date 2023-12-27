import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { TableComponent } from './Table/Table.component';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    MatButtonModule
  ],
  templateUrl: './Requests.component.html',
  styleUrls: ['./Requests.component.css'],
})
export class RequestsComponent implements OnInit {
  companies: any;
  advertisements: any;
  drivers: any;
  loading = true;

  constructor(private dataService: AdminService) { }

  ngOnInit() {
    this.refreshData();
  }
  refreshData()
  {
    this.dataService.getCompanies().subscribe(data => {
      this.companies = data;
      this.loading = false;
    });

    this.dataService.getAdvertisements().subscribe(data => {
      this.advertisements = data;
      this.loading = false;
    });

    this.dataService.getDrivers().subscribe(data => {
      this.drivers = data;
      this.loading = false;
    });
  }
}
