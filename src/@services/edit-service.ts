import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EditService {

private selectedSurvey : any;       // 用來儲存選中的問卷資料


setSurvey(survey: any){
  this.selectedSurvey = survey;
}

getSurvey(){
  return this.selectedSurvey;
}
}
