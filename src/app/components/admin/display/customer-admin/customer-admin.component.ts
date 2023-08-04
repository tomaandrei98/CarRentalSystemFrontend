import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerResponse } from 'src/app/interfaces/customer-response';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-admin',
  templateUrl: './customer-admin.component.html',
  styleUrls: ['./customer-admin.component.scss']
})
export class CustomerAdminComponent implements OnInit {

  customers!: Customer[]
  addCustomerForm!: FormGroup;
  updateCustomerForm!: FormGroup;
  customerToUpdate!: Customer;
  id!: number;

  constructor(private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loadCustomers()
    this.addCustomerFormInit()
    this.updateCustomerFormInit()
  }

  addCustomerFormInit() {
    this.addCustomerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, this.emailValidator]),
      phone: new FormControl('', [Validators.required, this.phoneLengthValidator]),
    })
  }

  updateCustomerFormInit() {
    this.updateCustomerForm = new FormGroup({
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

  loadCustomers() {
    this.customerService.getCustomers().subscribe(result => {
      this.customers = result.data
      console.log(this.customers)
    })
  }


  submitFormData() {
    console.log(this.addCustomerForm.value);

    this.customerService.addCustomer(this.addCustomerForm.value)
    .subscribe(result => {
      this.addCustomerForm.reset()
      console.log(result)
      console.log("Customer added successfully.")
      this.loadCustomers()
    })
  
    this.router.navigateByUrl('/admin')
  }

  submitUpdatedFormData() {
    console.log(this.updateCustomerForm.value);

    this.customerService.updateCustomer(this.id, this.updateCustomerForm.value)
      .subscribe(
        result => {
          this.updateCustomerForm.reset()
          console.log(result)
          console.log("Category updated successfully.")
          this.loadCustomers()
        }
      )
  }

  populateModalForEdit(customer: Customer) {
    if(customer.id) {
      this.id = customer.id

      this.customerService.getCustomerById(this.id)
      .subscribe(response => {
        this.customerToUpdate = response.data
      })
    }
  }

  confirmDelete(customer: Customer) {
    const confirmation = confirm(
      `Are you sure you want to delete the customer: ${JSON.stringify(customer)}?`
    )

    if(confirmation) {
      this.deleteCategory(customer);
    }
  }

  deleteCategory(customer: Customer) {
    if(customer.id) {
      this.customerService.deleteCustomerById(customer.id)
      .subscribe((data: CustomerResponse) => {
        console.log(data.message)
        this.loadCustomers()
      })  
    }
  }
}
