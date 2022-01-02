import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/service/common.service';
import { HttpErrorInterceptor } from 'src/app/service/http-error.interceptor';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserModel } from '../user-details/user-details.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() addvisible!: boolean
  @Input() editvisible!: boolean

  UserModelObj: UserModel = new UserModel()
  showAdd!: boolean;
  showUpdate!: boolean;
  addUserForm = this.UserDetailsComponent.addUserForm
  id = this.route.snapshot.params['id']

  constructor(
    public translateService: TranslateService,
    public route: ActivatedRoute,
    public UserDetailsComponent: UserDetailsComponent,
    private CommonService: CommonService,
    private HttpErrorInterceptor: HttpErrorInterceptor
  ) {
    this.translateService.addLangs(['en', 'ar'])
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit(): void {
  }

  clickAddUser() {
    this.addUserForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  onEdit() {
    this.CommonService.getCurrentData(this.id).subscribe((response: any) => {
      this.showAdd = false;
      this.showUpdate = true;
      this.addUserForm.patchValue({
        id: response.id,
        title: response.title,
        description: response.description,
      })
    })

  }
}
