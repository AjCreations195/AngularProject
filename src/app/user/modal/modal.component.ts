import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserModel } from '../user-details/user-details.model';
import { CommonService } from '../../service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorInterceptor } from 'src/app/service/http-error.interceptor';
import { ToastrService } from 'ngx-toastr';
import { CommonStore, commonStore } from 'src/app/stores/common-store';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() showAdd!: boolean
  @Input() showUpdate!: boolean

  addUserForm = this.UserDetailsComponent.addUserForm
  isSubmitted: boolean = false;
  public userError: string = '';
  user: any = []
  UserModelObj: UserModel = new UserModel()
  id = this.route.snapshot.params['id']
  constructor(
    public UserDetailsComponent: UserDetailsComponent,
    public commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    public cdr: ChangeDetectorRef,
    public commonStore: CommonStore,
    public HttpErrorInterceptor: HttpErrorInterceptor
  ) { }

  ngOnInit(): void {

  }
  save() {
    this.commonService.detectChanges(this.cdr)
    this.UserModelObj.id = this.addUserForm.value.id;
    this.UserModelObj.title = this.addUserForm.value.title;
    this.UserModelObj.description = this.addUserForm.value.description;

    this.commonService.AddUser(this.UserModelObj)
      .subscribe(
        {
          next: data => {

            this.commonService.detectChanges(this.cdr)
            console.log(data);
            alert('User Added Successfully');
            let ref = document.getElementById('cancel')
            ref?.click();
            this.UserDetailsComponent.getAll();
            this.addUserForm.reset();
            this.userError = ''

          },
          error: error => {
            this.commonService.detectChanges(this.cdr)
            this.userError = this.commonService.Error
            this.router.navigate(['/'])

          }
        }
      );
  }
  reset() {
    this.addUserForm.reset();
    this.addUserForm.controls['is_active'].setValue(1);
    this.isSubmitted = false;
  }

  editUser() {
    this.UserModelObj.id = this.addUserForm.value.id;
    this.UserModelObj.title = this.addUserForm.value.title;
    this.UserModelObj.description = this.addUserForm.value.description;

    this.commonService.editUser(this.UserModelObj.id, this.UserModelObj)
      .subscribe({
        next: data => {
          this.commonService.detectChanges(this.cdr)
          alert("Updated Succeesfully");
          let ref = document.getElementById('cancel')
          ref?.click();
          this.UserDetailsComponent.getAll();
          this.addUserForm.reset();
          this.userError = ''
          window.location.reload();
        },
        error: error => {
          this.commonService.detectChanges(this.cdr)
          this.userError = this.commonService.Error

        }
      }
      );

  }
  cancel() {
    window.location.reload()

  }
}
