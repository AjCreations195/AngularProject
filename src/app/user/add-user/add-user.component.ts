import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonStore } from '../../stores/common-store'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    contact: new FormControl(),
    is_active: new FormControl()
  });
  isSubmitted: boolean = false;
  constructor(public router: Router,
    private CommonService: CommonService,
    private CommonStore: CommonStore,
    private _fb: FormBuilder,
    private _http: HttpClient,
    public cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.addUserForm = this._fb.group({
      id: [0],
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z ]*$")]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      is_active: [1],
      organization_id: [1]

    });
  }
  get _fc() {
    return this.addUserForm.controls;
  }
  // save() {
  //   this.isSubmitted = true;
  //   if (this.addUserForm.invalid) {
  //     return;
  //   } else {
  //     let id = this.addUserForm.controls['id'].value;
  //     if (!id) {
  //       this.CommonService.AddUser(id, this.addUserForm).subscribe(() => {
  //         this.CommonService.detectChanges(this.cdr)
  //         alert('Created Successfully');
  //         this.router.navigate(['/user-details'])
  //       })

  //     }
  //   }
  // }
  save(){}
  reset() {
    this.addUserForm.reset();
    this.addUserForm.controls['is_active'].setValue(1);
    this.isSubmitted = false;
  }
}
