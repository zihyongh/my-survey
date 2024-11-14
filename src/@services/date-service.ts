import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DateService {

  // dateType: string 可以寫成 dateType: string = '-'，表示如果沒有傳值進去，預設值就是'-'
  changeDateFormat(dateData: Date, dateType: string = '-') {
    let year;
    let month;
    let day;
    if (dateData) {                         // 如果傳進來的值不是空值，就會執行下面方法
      year = dateData.getFullYear();
      month = dateData.getMonth() + 1;
      if (String(month).length == 1) {
        month = "0" + month;
      }
      day = dateData.getDate();
      if (String(day).length == 1) {
        day = "0" + day;
      }
      return year + dateType + month + dateType + day;
    } else {
      return '';
    }
  }

  addDate(dateData: Date, addDate: number) {
    dateData.setDate(dateData.getDate() + addDate);
    return dateData;
  }

  rmDate(dateData: Date, rmDate: number) {
    dateData.setDate(dateData.getDate() - rmDate);
    return dateData;
  }
}
