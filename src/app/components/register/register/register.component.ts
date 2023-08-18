import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  addAppUserForm!: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.addCustomerFormInit()
  }

  addCustomerFormInit() {
    this.addAppUserForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, this.emailValidator]),
      password: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, this.phoneLengthValidator]),
      role: new FormControl('', [Validators.required])
    })
  }

    // validations
    emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
      const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailPattern.test(control.value)) {
        return { invalidEmail: true };
      }
      return null;
    }
  
    phoneLengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
      const phonePattern = /^[0-9]+$/;
      if (!phonePattern.test(control.value) || control.value.length !== 10) {
        return { invalidPhoneLength: true };
      }
      return null;
    }
  
    
  submitFormData() {
    console.log(this.addAppUserForm.value);

    this.authService.registerUser(this.addAppUserForm.value).subscribe(
      (result) => {
        this.addAppUserForm.reset();
        console.log(result);
        console.log('Customer added successfully.');
        this.toastr.success("Customer added successfully!", "Thank you for registering!");
        this.router.navigateByUrl('/login')
      },
      (error) => {
          // alert(error.error.message)
          this.toastr.error(error.error.message);
      }
    );
  }
}
