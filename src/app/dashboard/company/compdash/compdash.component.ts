import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-compdash',
  templateUrl: './compdash.component.html',
  styleUrls: ['./compdash.component.css']
})
export class CompdashComponent {
  constructor(private authService: AuthService, private toastr: ToastrService,private router:Router) {}

  logout(): void {
    this.authService.logout();
    this.toastr.success("Logout Successfully");
    this.router.navigate(["home"])
  }
}
