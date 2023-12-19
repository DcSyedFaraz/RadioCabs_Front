import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MembershipType } from './member';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  membershipTypes = MembershipType;

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      telephone: ['', []],
      faxNumber: ['', []],
      email: ['', [Validators.required, Validators.email]],
      membershipType: MembershipType[MembershipType.Standard],
      acceptTerms: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Form submitted:', this.registerForm.value);

    this.service.register(this.registerForm.value).subscribe(
      a => {
        console.log("Register Data Successfully ", a);

      }
    );
    this.registerForm.reset();
  }
}
