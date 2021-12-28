import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../service/common.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserModel } from '../user-details/user-details.model';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  showAdd: boolean = false;
  showUpdate: boolean = false;
  UserModelObj: UserModel = new UserModel()
  addUserForm = this.UserDetailsComponent.addUserForm
  isSubmitted: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private CommonService: CommonService,
    public cdr: ChangeDetectorRef,
    public UserDetailsComponent: UserDetailsComponent,
    public translateService: TranslateService
  ) {
    this.translateService.addLangs(['en', 'ar'])
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');

  }

  id = this.route.snapshot.params['id']
  title: string = ''
  description: string = ''
  organization_id = 1


  ngOnInit(): void {
    this.CommonService.getCurrentData(this.id).subscribe((response: any) => {
      this.CommonService.detectChanges(this.cdr)


      this.UserModelObj.id = response.id;
      this.UserModelObj.title = response.title;
      this.UserModelObj.description = response.description;

    })

  }

  clickAddUser() {
    this.addUserForm.reset();
    this.showAdd = true;
    this.showUpdate = false;

  }

  editUser() {
    this.UserModelObj.id = this.addUserForm.value.id;
    this.UserModelObj.title = this.addUserForm.value.title;
    this.UserModelObj.description = this.addUserForm.value.description;

    this.CommonService.editUser(this.id, this.UserModelObj).subscribe(response => {

      alert("Updated Succeesfully");
      let ref = document.getElementById('cancel')
      ref?.click();

      this.addUserForm.reset();
      this.UserDetailsComponent.getAll();
    }
    )
  }
}
