import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.css']
})
export class UserdashComponent {
  constructor(private authService: AuthService, private toastr: ToastrService) {}

  logout(): void {
    this.toastr.success("Logout Successfully");

    this.authService.logout();
  }
}
