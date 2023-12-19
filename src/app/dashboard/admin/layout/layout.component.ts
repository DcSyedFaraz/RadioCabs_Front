import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css', '../../../../assets/css/theme.min.css', '../../../../assets/css/icons.min.css']
})
export class LayoutComponent {

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  logout(): void {
    this.toastr.success("Logout Successfully");

    this.authService.logout();
  }

}
