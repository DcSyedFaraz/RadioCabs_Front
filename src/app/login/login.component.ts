import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthService, private router:Router) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
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
      const authToken = response?.token; // Adjust this based on your actual response structure

      if (authToken) {
        console.log("Login Data Successfully");
        localStorage.setItem('logintoken', authToken);
        // this.router.navigate(["admin/dashboard"]);
      } else {
        console.error("Token not found in the response.");
      }
    },
    error => {
      console.error("Login failed:", error);
    }
  );
  console.log('Form submitted:', this.loginForm.value);
}


  getData(){
    this.service.getData().subscribe(
      a => {
        console.log(a);

      }
    )
  }
}
