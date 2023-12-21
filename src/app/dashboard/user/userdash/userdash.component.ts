import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.css']
})
export class UserdashComponent {
  constructor(private authService: AuthService, private toastr: ToastrService,private router:Router) {}

  logout(): void {
    this.authService.logout();
    this.toastr.success("Logout Successfully");
    this.router.navigate(["home"]);
  }
}
