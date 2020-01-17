import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ChangePasswordService } from './change-password.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pb-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public isSubmited = false;
  public changePasswordData = {
    'oldpassword' : undefined,
    'password' : undefined,
    'cpassword' : undefined
  };
  public isDisabled = false;
  public isLoading: boolean;
  constructor(
    public changepasswordservice: ChangePasswordService,
    private router: Router,
    public toasterservice: ToastrService
    ) { }

  public ngOnInit() {
  }

  public changePassword(changePasswordForm) {
    this.isSubmited = true;
    if (changePasswordForm.valid && (this.changePasswordData['password'] === this.changePasswordData['cpassword'] ) ) {
      this.isDisabled = true;
      const options = {
        'oldpassword': this.changePasswordData['oldpassword'],
        'password': this.changePasswordData['cpassword']
      };
      this.changepasswordservice.changePasswordService(options).subscribe((data) => {
        this.isDisabled = false;
        if (data.code === 200) {
          if (data.data.status === true) {
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.toasterservice.error(data['message'], 'Error');
        }
      },
        (error) => {
          console.error(error);
          this.isDisabled = false;
        });

    }
  }
}
