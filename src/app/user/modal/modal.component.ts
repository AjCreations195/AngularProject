import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserModel } from '../user-details/user-details.model';
import { CommonService } from '../../service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorInterceptor } from 'src/app/service/http-error.interceptor';
import { CommonStore} from 'src/app/stores/common-store';
import {IAngularMyDpOptions} from 'angular-mydatepicker';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() showAdd!: boolean
  @Input() showUpdate!: boolean

  addUserForm = this.UserDetailsComponent.addUserForm;
  isSubmitted: boolean = false;
  public userError: string = '';
  user: any = []
  UserModelObj: UserModel = new UserModel()
  id = this.route.snapshot.params['id']
  selectedFile:File[]=[];
  public reader =new FileReader();
  myDatePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
      
    }
  constructor(
    public UserDetailsComponent: UserDetailsComponent,
    public commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    public cdr: ChangeDetectorRef,
    public commonStore: CommonStore,
    public HttpErrorInterceptor: HttpErrorInterceptor
  ) { }

  p:number=1;
  events: string[] = [];
  ngOnInit(): void {

  }
  save() {
    this.commonService.detectChanges(this.cdr)
    this.UserModelObj.id = this.addUserForm.value.id;
    this.UserModelObj.title = this.addUserForm.value.title;
    this.UserModelObj.description = this.addUserForm.value.description;
    this.UserModelObj.files= this.addUserForm.value.files;
      console.log("filee",this.addUserForm.value.files);
    console.log(this.UserModelObj.files);

    this.commonService.AddUser(this.UserModelObj)
      .subscribe(
        {
          next: data => {
            console.log(data);
            this.commonService.detectChanges(this.cdr)
              alert('User Added Successfully');
            let ref = document.getElementById('cancel')
            ref?.click();
            // this.UserDetailsComponent.pageChange();
            // this.addUserForm.reset();
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
          this.UserDetailsComponent.pageChange();
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
  url:string="";
  onFileSelected(event:any):void{
    console.log(event);    
    this.selectedFile=event.target.files[0]
    if(event.target.files)
      this.reader.readAsDataURL(event.target.files[0]);
      this.reader.onload= (e:any)=>{
          this.url=e.target.result;
      }
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

}
