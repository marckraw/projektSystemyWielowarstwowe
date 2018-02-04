import { Injectable } from '@angular/core';
import {ShortUserData} from "../models/ShortUserData";

@Injectable()
export class LocalStorageService {

  constructor() { }

  setData(shortUserData: ShortUserData) {
      localStorage.setItem('user_data', JSON.stringify(shortUserData));
  }

  getData(data: string) {
      return localStorage.getItem(data);
  }

  removaData(data: string) {
      return localStorage.removeItem(data);
  }

}
