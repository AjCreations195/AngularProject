import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { CommonService } from '../../service/common.service';
import { HttpClient } from '@angular/common/http';
import { CommonStore } from '../../stores/common-store'
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {

  alert: boolean = false;
  editUserForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    organization_id: new FormControl(1)
  });
  public userList: any = [];
  isSubmitted: boolean = false;
  id: number = 0;
  constructor(public router: Router,
    private CommonService: CommonService,
    private _fb: FormBuilder,
    private _http: HttpClient,
    private route: ActivatedRoute,
    public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.CommonService.getCurrentData(this.id).subscribe((response: any) => {
      this.CommonService.detectChanges(this.cdr)
      console.log(response);

      this.editUserForm = new FormGroup({
        id: new FormControl(response['id']),
        title: new FormControl(response['title'], [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z ]*$")]),
        description: new FormControl(response['description'], [Validators.required, Validators.minLength(10)]),
        organization_id: new FormControl(1)
      });

    })
  }

  editUser() {
    this.isSubmitted = true;
    if (this.editUserForm.invalid) {
      return;
    } else {
      this.CommonService.editUser(this.route.snapshot.params['id'], this.editUserForm.value)
        .subscribe((response) => {
          alert('Updated Successfully');
          this.router.navigate(['/user-details'])
        })
    }
  }
  // fetching form control values
  get _fc() {
    return this.editUserForm.controls;
  }

}