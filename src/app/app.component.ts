import { provideHttpClientService } from './http-service/http-client.service';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


// 名字要和ts裡面class的名字一樣
export class AppComponent {
  constructor(private http: provideHttpClientService, private router: Router) {
  }

  ngOnInit(): void {
    this.http.getApi('https://api.freeapi.app/api/v1/kitchen-sink/http-methods/get')
      .subscribe((res) => console.log(res));
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
}
