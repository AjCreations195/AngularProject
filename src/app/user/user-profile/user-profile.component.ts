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
  }

  id = this.route.snapshot.params['id']


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

}
