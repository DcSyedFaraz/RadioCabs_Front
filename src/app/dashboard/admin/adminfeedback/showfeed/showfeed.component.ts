import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { delay } from 'rxjs';

@Component({
  selector: 'app-showfeed',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './showfeed.component.html',
  styleUrls: ['./showfeed.component.css'],
})
export class ShowfeedComponent implements OnInit {
  details: any;
  id: any;
  loading: boolean = true;

  constructor(private service: AdminService, private toastr: ToastrService, private router: ActivatedRoute, private routers: Router) { }


  ngOnInit(): void {

    this.id = this.router.snapshot.paramMap.get('id');
    // alert(this.companyId);
    this.service.editFeed(this.id).pipe(
      delay(1000) // 1000 milliseconds = 1 second
    ).subscribe(res => {
      console.log(res);
      this.details = res;
      this.loading = false;
    })
  }

}
