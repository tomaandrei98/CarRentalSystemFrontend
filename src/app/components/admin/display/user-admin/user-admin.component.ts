import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/interfaces/app-user';
import { AppUserService } from 'src/app/services/app-user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  appUsers!: AppUser[];
  addAppUserForm!: FormGroup;
  updateAppUserForm!: FormGroup;
  appUserIdToUpdate: number = -1;
  editAppUserForm: any;
  totalPages: number = 0;
  currentPage: number = 0;

  constructor(private appUserService: AppUserService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadAppUsers()
    this.addAppUserFormInit()
    this.updateAppUserFormInit()
  }

  loadAppUsers() {
    // this.appUserService.getAppUsers().subscribe(result => {
    //   this.appUsers = result.data
    //   // console.log("users " + JSON.stringify(this.appUsers))
    // })


    this.appUserService.getAppUsersPaginated().subscribe(result => {
      console.log(result)
      this.appUsers = result.data.users
      this.totalPages = result.data.numberOfPages;
    })
  }

  addAppUserFormInit() {
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

  updateAppUserFormInit() {
    this.updateAppUserForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, this.emailValidator]),
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
    // console.log(this.addAppUserForm.value);

    this.authService.registerUser(this.addAppUserForm.value).subscribe(
      (result) => {
        this.addAppUserForm.reset();
        console.log(result);
        console.log('User added successfully.');
        this.loadAppUsers();
      },
      (error) => {
          alert(error.error.message)
      }
    );
  
    this.router.navigateByUrl('/admin')
  }


  openEditModal(appUser: AppUser) {
    this.appUserIdToUpdate = appUser.id;
    this.updateAppUserForm.patchValue({
        username: appUser.username,
        first_name: appUser.firstName,
        last_name: appUser.lastName,
        email: appUser.email,
        phone: appUser.phone,
        role: appUser.role
    });
  }


  submitUpdateForm() {
    if (this.appUserIdToUpdate !== -1) {
      console.log(this.updateAppUserForm.value)
        this.appUserService.updateUser(this.appUserIdToUpdate, this.updateAppUserForm.value).subscribe(
            (result) => {
              this.updateAppUserForm.reset()
                console.log(result);
                console.log('User updated successfully.');
                this.loadAppUsers();
            },
            (error) => {
                alert(error.error.message);
            }
        );
    }
  }


  deleteUser(username: string) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.appUserService.deleteUser(username).subscribe(
        () => {
          console.log('User deleted successfully.');
          this.loadAppUsers();
        },
        (error) => {
          alert(error.error.message);
        }
      );
    }
  }

  goToPage(pageNumber: number) {
    this.appUserService
      .getAppUsersPaginated(pageNumber, 10, 'firstName')
      .subscribe((result) => {
        console.log(result)
        this.currentPage = pageNumber;
        this.appUsers = result.data.users;
        this.totalPages = result.data.numberOfPages;
      });
  }

  goToNextOrPreviousPage(direction: string) {
    this.goToPage(
      direction === 'forward' ? this.currentPage + 1 : this.currentPage - 1
    );
  }
  
}
