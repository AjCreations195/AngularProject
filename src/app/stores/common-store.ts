import { Injectable } from '@angular/core';
import { observable, computed, action } from 'mobx-angular';
@Injectable()
export class CommonStore {

  constructor() { }

  @observable
  user: any = [];

  @observable  
  Error: string = ''

  @action setError(error:any){
    this.Error=error
  }

  @computed get error(){
    return this.Error
  }

  @observable
  isSubmitted: boolean = false;

  @observable
  id: number = 0;

  @action setUsers(user: any) {
    this.user = user;
  }
  @computed UserId() {
    return this.id
  }
  @action getCurrentData(id: number) {
    return this.userList.find((e: { id: number; }) => e.id == id);
  }

  @computed get userList() {
    return this.user
  }
}

export const commonStore = new CommonStore();
