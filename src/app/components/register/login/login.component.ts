import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginFormInit();
  }

  loginFormInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, this.emailValidator]),
    });
  }

  // validations
  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailPattern.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

      
  // submitFormData() {
  //   console.log(this.loginForm.value);

  //   this.customerService.loginCustomer(this.loginForm.value).subscribe(
  //     (result) => {
  //       this.addCustomerForm.reset();
  //       console.log(result);
  //       console.log('Customer added successfully.');
        
  //       this.router.navigateByUrl('/home')
  //     },
  //     (error) => {
  //         alert(error.error.message)
  //     }
  //   );
  
}
