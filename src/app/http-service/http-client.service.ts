import { provideHttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class provideHttpClientService {
  constructor(private http: HttpClient) { }

  // 讀取
  getApi(url: string) {
    return this.http.get(url);
  }
  // 新增
  postApi(url: string, postData: any) {
    return this.http.post(url, postData);
  }

  // 更新
  putApi(url: string, postData: any) {
    return this.http.put(url, postData);
  }

  // 刪除
  delApi(url: string) {
    return this.http.delete(url);
  }

}


