import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../assets/css/theme.min.css', '../../assets/css/icons.min.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthService, private router: Router, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const userRoles = this.service.getUserRoles();
    console.log('User Roles:', userRoles);
  }

  onSubmit() {
    this.service.login(this.loginForm.value).subscribe(
      (response: any) => {
        const authToken = response?.token;

        if (authToken) {
          this.toastr.success("Login Successfully");
          localStorage.setItem('logintoken', authToken);
          // this.router.navigate(["admin/dashboard"]);
          const roles = this.service.getUserRoles();
          if (roles.includes('admin')) {

            this.router.navigate(["admin"]);

          } else if (roles.includes('user')) {

            this.router.navigate(["user"]);

          } else if (roles.includes('company')) {

            this.router.navigate(["company"]);

          } else if (roles.includes('driver')) {

            this.router.navigate(["driver"]);
          }

        } else {
          this.toastr.error("Token not found in the response.");
        }
      },
      error => {
        console.log(error.error.message);

        this.toastr.error(error.error.message, "Login failed:");
      }
    );
    console.log('Form submitted:', this.loginForm.value);
  }


  getData() {
    this.service.getData().subscribe(
      a => {
        console.log(a);

      }
    )
  }
}
