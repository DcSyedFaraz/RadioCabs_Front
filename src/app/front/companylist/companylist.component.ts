import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-companylist',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css'],
})
export class CompanylistComponent implements OnInit {
  dataSource: any;

  constructor(private service: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.gettingdata();
  }

  gettingdata() {
    this.service.getData()
      .subscribe((data) => {
        console.log(data);

        this.dataSource = data ;
      },
        (error) => {
          console.error('Error fetching data:', error);
        })
  }

}
