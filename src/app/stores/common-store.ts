import { Injectable } from '@angular/core';
import { observable, computed, action } from 'mobx-angular';
import { UserModel, UserPaginationResponse } from '../user/user-details/user-details.model';
import { UserDetailsComponent } from '../user/user-details/user-details.component';
@Injectable()
export class CommonStore {

  constructor() { }

  @observable
  user: UserModel[] = []

  @observable
  Error: string = ''


  @observable
  currentPage: number = 1;

  @observable
  nextPage: number = 2;

  @observable
  itemsPerPage: number = 15;

  @observable
  loaded: boolean = false;

  @observable
  totalItems: number = 0;

  @observable
  from: number = 0;

  @action
  setUser(response: UserPaginationResponse) {

    this.user = response.data;
    this.currentPage = response.current_page;
    this.itemsPerPage = response.per_page;
    this.totalItems = response.total;
    this.from = response.from;
    this.loaded = true;
  }

  @action
  setCurrentPage(current_page: number) {
    this.currentPage = current_page;
  }


  @action setError(error: any) {
    this.Error = error
  }

  @computed get error() {
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

  @computed get userList(): UserModel[] {
    return this.user.slice()
  }
}

export const commonStore = new CommonStore();
