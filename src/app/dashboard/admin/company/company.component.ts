import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
data: any;
  // data: any[] = [];

  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(): void {
    this.service.getData().subscribe(
      (result) => {
        this.data = result;
        console.log(this.data);

      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}

