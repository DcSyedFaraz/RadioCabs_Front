import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-driverdash',

  templateUrl: './driverdash.component.html',
  styleUrls: ['./driverdash.component.css'],
})
export class DriverdashComponent  {

  constructor(private authService: AuthService, private toastr: ToastrService,private router:Router) {}

  logout(): void {
    this.authService.logout();
    this.toastr.success("Logout Successfully");
    this.router.navigate(["home"])
  }

}
