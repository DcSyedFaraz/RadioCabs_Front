import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { RequestsComponent } from '../Requests.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    // BrowserModule,
    MatTableModule,
    MatButtonModule,
    RequestsComponent
  ],
  templateUrl: './Table.component.html',
  styleUrls: ['./Table.component.css'],
})
export class TableComponent {
  constructor(private service: AdminService, private toastr: ToastrService) { }
  @Input() data: any;
  @Input() tableName: any;
  @Input() loading: any;
  @Input() columns: any;
  @Output() refreshDataEvent = new EventEmitter<void>();

  approve(event: any, row: any, name: any) {
    console.log('Approved:', row.id, name);
    // Implement your approval logic here
    if (confirm('are you sure?')) {
      event.target.innerText = "Updating...";

      if (name == 'Drivers') {
        this.service.appDriver(row.id).subscribe((res: any) => {
          this.toastr.success(res.message)
          console.log(res);
          this.refreshDataEvent.emit();
        })
      }
      if (name == 'Companies') {
        this.service.appCompany(row.id).subscribe((res: any) => {
          this.toastr.success(res.message)
          console.log(res);
          this.refreshDataEvent.emit();
        })
      }
      if (name == 'Advertisements') {
        this.service.appAD(row.id).subscribe((res: any) => {
          this.toastr.success(res.message)
          console.log(res);
          this.refreshDataEvent.emit();
        })
      }

    }
  }

  decline(event: any, row: any, name: any) {
    console.log('Declined:', row, name);
    // Implement your decline logic here

    if (name == 'Drivers') {
      this.service.decDriver(row.id).subscribe((res: any) => {
        this.toastr.success(res.message)
        console.log(res);
        this.refreshDataEvent.emit();
      })
    }
    if (name == 'Companies') {
      this.service.decCompany(row.id).subscribe((res: any) => {
        this.toastr.success(res.message)
        console.log(res);
        this.refreshDataEvent.emit();
      })
    }
    if (name == 'Advertisements') {
      this.service.decAD(row.id).subscribe((res: any) => {
        this.toastr.success(res.message)
        console.log(res);
        this.refreshDataEvent.emit();
      })
    }

  }
}

