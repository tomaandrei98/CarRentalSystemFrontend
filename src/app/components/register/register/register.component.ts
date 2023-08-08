import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  addCustomerForm!: FormGroup;

  constructor(private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.addCustomerFormInit()
  }

  addCustomerFormInit() {
    this.addCustomerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, this.emailValidator]),
      phone: new FormControl('', [Validators.required, this.phoneLengthValidator]),
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
    console.log(this.addCustomerForm.value);

    this.customerService.addCustomer(this.addCustomerForm.value).subscribe(
      (result) => {
        this.addCustomerForm.reset();
        console.log(result);
        console.log('Customer added successfully.');
        
        this.router.navigateByUrl('/home')
      },
      (error) => {
          alert(error.error.message)
      }
    );
  
  }


}
